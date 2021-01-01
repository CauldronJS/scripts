/**
 * bootstrap/loader.js
 * ===================
 * This file is in charge of loading internal modules. This file is called before any
 * others in the core in order to setup proper and consistent loading (besides plugin.js).
 * After this is loaded, it is passed to bootstrap/core.js. The require given to these
 * internal modules cannot load external modules, and the global require cannot load these
 * modules.
 */

'use strict';

function internalBinding(name) {
  try {
    throw new Error();
  } catch (err) {
    // check the filename to ensure the caller is from the internal lib
  }
  return Polyglot.import('BindingProvider').getBinding(name);
}

function log(level, verbose, content) {
  const Level = Java.type('java.util.logging.Level');
  const JavaException = Java.type('java.lang.Exception');
  const logger = internalBinding('Logger');

  const stackTraceMemo = {};
  /**
   *
   * @param {string} stack
   *
   * @returns {any[]}
   */
  function parseStackTraceByLine(stack) {
    return stack
      .split('\n')
      .slice(1)
      .reduce((stackTrace, elm) => {
        if (stackTraceMemo[elm]) {
          return [...stackTrace, stackTraceMemo[elm]];
        }
        const parts = elm.split('at ')[1]?.split(' ');
        const functionName = parts.length === 1 ? null : parts[0];
        const fileDetails = parts.length === 1 ? parts[0] : parts[1];
        const [filename, line, column] = fileDetails
          .replace(/\(|\)/g, '')
          .split(':');
        const entry = { functionName, filename, line, column };
        stackTraceMemo[elm] = entry;
        return [...stackTrace, entry];
      }, []);
  }

  // if (verbose && !globalThis.debugMesages) return;
  content.forEach((msg) => {
    if (msg === undefined || typeof msg === 'undefined') {
      logger.log(Level.INFO, `\u001B[${level}mundefined\u001B[0m`);
    } else if (msg === null) {
      logger.log(Level.INFO, `\u001B[${level}mnull\u001B[0m`);
    } else if (msg instanceof Array) {
      logger.log(
        Level.INFO,
        `\u001B[${level}m\n${JSON.stringify(msg, ' ', '\t').replace(
          /\t/g,
          '  '
        )}\u001B[0m`
      );
    } else if (typeof msg === 'string') {
      logger.log(Level.INFO, `\u001B[${level}m${msg}\u001B[0m`);
    } else if (typeof msg === 'function') {
      logger.log(Level.INFO, `\u001B[${level}m[function ${msg.name}]\u001B[0m`);
    } else if (msg instanceof Error) {
      // const stackTrace = parseStackTraceByLine(msg.stack);
      // stackTrace
      //   .reduce(
      //     (stack, elm) => {
      //       const { filename, line, column, functionName } = elm;
      //       try {
      //         const mapping = JSON.parse(fileReader.read(filename + '.map'));
      //         const sourceMap = sourceMapParser.parseSourceMap(mapping);
      //         console.log(sourceMap.getVersion());
      //       } catch (err) {
      //         if (err instanceof FileNotFoundException) {
      //           // ignore, no mapping or invalid mapping
      //         } else {
      //           console.log(err);
      //         }
      //       }
      //       return stack;
      //     },
      //     [msg.stack?.split('\n')[0]]
      //   )
      //   .join('\n');
      logger.log(Level.SEVERE, `\u001b[${level}m${msg.stack}\u001B[0m`);
    } else if (msg instanceof JavaException) {
      // msg.setStackTrace(
      //   jsUtils.applySourceMapToStack($$isolate$$, msg.getStackTrace())
      // );
      const stack = `${msg.toString()}${[...msg.getStackTrace()]
        .filter(
          (elm) =>
            !elm.isNativeMethod() &&
            !elm.getClassName().startsWith('com.oracle.truffle') &&
            !elm.getClassName().startsWith('org.graalvm')
        )
        .map((elm) => `\n\t${elm.toString()}`)}`;
      logger.log(Level.SEVERE, `\u001b[${level}m${stack}\u001B[0m`);
    } else {
      logger.log(
        Level.INFO,
        `\u001B[${level}m${JSON.stringify(msg, ' ', '\t').replace(
          /\t/g,
          '  '
        )}\u001B[0m`
      );
    }
  });
}

// eslint-disable-next-line no-unused-vars
const console = {
  log: (...content) => log('0', false, content),
  warn: (...content) => log('33', false, content),
  error: (...content) => log('31', false, content),
  debug: (...content) => log('36', true, content),
  trace: (...content) => log('31', false, content),
};

// GLOBALS INITIALIZATION
const noop = () => {};

globalThis.DTRACE_HTTP_SERVER_RESPONSE = noop;
globalThis.COUNTER_HTTP_SERVER_RESPONSE = noop;

(function () {
  const wrapper = [
    '(function (exports, module, require, process, NativeModule) {',
    '\n})',
  ];

  const INTERNAL_LIBS = [
    'assert',
    'async',
    'buffer',
    'child_process',
    'cluster',
    'console',
    'constants',
    'crypto',
    'dgram',
    'dns',
    'domain',
    'errors',
    'events',
    'fs',
    'http',
    'http2',
    'https',
    'lang',
    'module',
    'net',
    'os',
    'path',
    'perf_hooks',
    'process',
    'querystring',
    'readline',
    'repl',
    'semver',
    'stream',
    'string_decoder',
    'timer',
    'tls',
    'tty',
    'url',
    'util',
    'zlib',
  ];

  const fileReader = internalBinding('FileReader');
  const scriptRunner = internalBinding('ScriptRunner');
  const polyfills = fileReader.read('./lib/internal/bootstrap/polyfill.js');
  scriptRunner.runScript(polyfills, 'lib/internal/bootstrap/polyfill.js');

  class NativeModule {
    constructor(id, content = null) {
      this.filename = `lib/${id}.js`;
      this.content = content;
      this.id = id;
      this.exports = {};
      this.reflect = undefined;
      this.exportsKeys = undefined;
      this.loaded = false;
      this.loading = true;
      this.isNative = true;
    }

    toString() {
      return `[NativeModule ${this.id}]`;
    }

    cache() {
      NativeModule._cache[this.id] = this;
    }

    compile(cache = true) {
      const script = this.content || fileReader.read(this.filename);
      const wrapped = NativeModule.wrap(script);
      const args = buildRequireArgs(this);
      const compiled = scriptRunner.runScript(wrapped, this.filename);
      const source = compiled.apply(null, args);
      if (cache) {
        NativeModule._source[this.id] = source;
      }
      this.loaded = true;
      this.loading = false;
      return this.exports;
    }

    static require(id) {
      if (id === loaderId) return loaderExports;
      const cached = NativeModule.getCached(id);
      if (cached) return cached.exports;

      if (NativeModule._resolvers) {
        const resolved = NativeModule.tryResolve(id);
        if (resolved) return resolved;
      }

      const nativeModule = new NativeModule(id);
      nativeModule.cache();
      nativeModule.compile();

      return nativeModule.exports;
    }

    static requireForDeps(id) {
      if (!NativeModule.exists(id) || NativeModule.isDepsModule(id)) {
        id = `internal/deps/${id}`;
      }
      return NativeModule.require(id);
    }

    static isInternal(id) {
      // TODO: do an actual check so resolved requests can't be juked past this (i.e.: '../../plugins/cauldron/lib/internal')
      return id.startsWith('internal/') || id.startsWith('internal\\');
    }

    static getSource(id) {
      return NativeModule._source[id];
    }

    static exists(id) {
      return NativeModule._source.hasOwnProperty(id);
    }

    static nonInternalExists(id) {
      return INTERNAL_LIBS.indexOf(id) > -1;
    }

    static wrap(script) {
      return wrapper[0] + script + wrapper[1];
    }

    static getCached(id) {
      return NativeModule._cache[id];
    }

    static $$resetContext() {
      for (const namespace in this._cache) {
        delete this._cache[namespace];
      }
    }

    static $$bootstrap() {
      return this.require('internal/bootstrap/core');
    }

    static $$eval(content) {
      const tempModule = new NativeModule('__eval__', content);
      return tempModule.compile(false);
    }
  }

  NativeModule.tryResolve = (request) => {
    // eslint-disable-next-line prefer-const
    for (let resolver of NativeModule._resolvers) {
      const testResult = resolver.test(request);
      if (!testResult) continue;
      return resolver.process(request, testResult);
    }
  };

  NativeModule._source = Object.create(null); // TODO: setup natives
  NativeModule._cache = Object.create(null);
  NativeModule.INTERNAL_LIBS = INTERNAL_LIBS;

  const config = {}; // TODO: setup config

  const loaderExports = {
    NativeModule,
  };
  const loaderId = 'internal/bootstrap/loaders';
  const buildRequireArgs = (target) => [
    target.exports,
    target,
    NativeModule.require,
    globalThis.process,
    NativeModule,
  ];

  const javaResolver = NativeModule.require('internal/resolvers/java');
  const shorthandResolver = NativeModule.require(
    'internal/resolvers/shorthand'
  );
  const libResolver = NativeModule.require('internal/resolvers/lib');

  /**
   * What are the differences between resolvers and transformers???
   *
   * - A resolver will take a path from a require call and redirect it to a
   *   non-cached source. This may be a network call, Java type call, or a
   *   custom one of a non-familiar code source. This means it gets called
   *   before any other info is fetched.
   *
   * - A transformer's source CANNOT be changed. The filename location and
   *   file contents will never be changed. The transformer's job is to take
   *   the source of the requested file and create a module that other files
   *   can use.
   */

  /**
   * Custom resolvers for Cauldron
   */
  NativeModule._resolvers = [javaResolver, shorthandResolver, libResolver];

  function makeGlobal(id) {
    Object.defineProperties(
      globalThis,
      Object.getOwnPropertyDescriptors(toImport)
    );
  }

  makeGlobal('internal/timers');
  makeGlobal('internal/buffer');
  makeGlobal('internal/process/core');
  globalThis.debugMessages = process.config.variables.debugMessages;

  globalThis.NativeModule = NativeModule;

  return loaderExports;
})();
