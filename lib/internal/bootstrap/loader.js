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

globalThis.Bukkit = Java.type('org.bukkit.Bukkit');

const log = (level, verbose, content) => {
  if (verbose && !globalThis.debugMesages) return;
  content.forEach(msg => {
    if (msg === undefined || typeof msg === 'undefined') {
      Bukkit.getConsoleSender().sendMessage(`\xA7${level}[Cauldron] undefined`);
    } else if (msg === null) {
      Bukkit.getConsoleSender().sendMessage(`\xA7${level}[Cauldron] null`);
    } else if (msg instanceof Array) {
      Bukkit.getConsoleSender().sendMessage(
        `\xA7${level}[Cauldron]\n${JSON.stringify(msg, ' ', '\t').replace(
          /\t/g,
          '  '
        )}`
      );
    } else if (typeof msg === 'string') {
      Bukkit.getConsoleSender().sendMessage(`\xA7${level}[Cauldron] ${msg}`);
    } else if (typeof msg === 'function') {
      Bukkit.getConsoleSender().sendMessage(
        `\xA7${level}[Cauldron] [function ${msg.name}]`
      );
    } else {
      Bukkit.getConsoleSender().sendMessage(
        `\xA7${level}[Cauldron] ${JSON.stringify(msg, ' ', '\t').replace(
          /\t/g,
          '  '
        )}`
      );
    }
  });
};

const console = {
  log: (...content) => log('r', false, content),
  warn: (...content) => log('d', false, content),
  error: (...content) => log('c', false, content),
  debug: (...content) => log('a', true, content),
  trace: (...content) => log('r', false, content)
};
const { Files, Paths } = java.nio.file;

// add all JARs to the classpath
Files.walk(Paths.get('./plugins'))
  .filter(file => file.toFile().isFile() && file.toString().endsWith('.jar'))
  .forEach(file => {
    Java.addToClasspath(file.toString());
  });

// GLOBALS INITIALIZATION
const noop = () => {};

globalThis.DTRACE_HTTP_SERVER_RESPONSE = noop;
globalThis.COUNTER_HTTP_SERVER_RESPONSE = noop;

const $$cauldron$$ = Bukkit.getPluginManager().getPlugin('Cauldron');

(function() {
  const wrapper = [
    '(function (exports, module, require, process, NativeModule) {',
    '\n})'
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
    'zlib'
  ];

  class NativeModule {
    constructor(id) {
      this.filename = `lib/${id}.js`;
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

    compile() {
      const script = Java.type('me.conji.cauldron.core.FileReader').read(
        $$cauldron$$,
        this.filename
      );
      const wrapped = NativeModule.wrap(script);
      const args = buildRequireArgs(this);
      const compiled = $$cauldron$$.isolate().runScript(wrapped, this.filename);
      const source = compiled.apply(null, args);
      NativeModule._source[this.id] = source;
      this.loaded = true;
      this.loading = false;
      return this.exports;
    }

    static require(id) {
      if (id === loaderId) return loaderExports;
      const cached = NativeModule.getCached(id);
      if (cached) return cached.exports;

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
      this.require('internal/bootstrap/core');
    }
  }

  NativeModule._source = Object.create(null); // TODO: setup natives
  NativeModule._cache = Object.create(null);
  NativeModule.INTERNAL_LIBS = INTERNAL_LIBS;

  const config = {}; // TODO: setup config

  const loaderExports = {
    NativeModule
  };
  const loaderId = 'internal/bootstrap/loaders';
  const buildRequireArgs = target => [
    target.exports,
    target,
    NativeModule.require,
    globalThis.process,
    NativeModule
  ];

  globalThis.process = NativeModule.require('internal/process/core');
  globalThis.Buffer = NativeModule.require('internal/buffer').Buffer;
  globalThis.debugMessages = process.config.variables.debugMessages;

  NativeModule.$$bootstrap();

  return loaderExports;
})();
