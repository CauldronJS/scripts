/**
 * bootstrap/loader.js
 * ===================
 * This file is in charge of loading internal modules. This file is called before any
 * others in the core in order to setup proper and consistent loading (besides plugin.js).
 * After this is loaded, it is passed to bootstrap/core.js. The require given to these
 * internal modules cannot load external modules, and the global require cannot load these
 * modules.
 */

// GLOBALS INITIALIZATION
const noop = () => {};
global.Bukkit = Java.type('org.bukkit.Bukkit');
global.__cauldron__ = Bukkit.getPluginManager().getPlugin('Cauldron');

global.evalScript = (script, filename) =>
  __cauldron__.evalScript(script, filename || 'eval');

global.log = (msg, level = '7', verbose) => {
  if (verbose && !global.debugMessages) return;
  if (msg === undefined) {
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
  } else {
    Bukkit.getConsoleSender().sendMessage(
      `\xA7${level}[Cauldron] ${JSON.stringify(msg, ' ', '\t').replace(
        /\t/g,
        '  '
      )}`
    );
  }
};
global.Buffer = Object.create(null); // temp value
global.DTRACE_HTTP_SERVER_RESPONSE = noop;
global.COUNTER_HTTP_SERVER_RESPONSE = noop;

(function() {
  const wrapper = [
    '(function (exports, module, require, process, plugin, NativeModule) {',
    '\n})'
  ];

  const SHORTHAND_NAMESPACES = {
    bukkit(request) {
      return `org.${request.replace(/\/|\\/g, '.')}`;
    },
    spigotmc(request) {
      return `org.${request.replace(/\/|\\/g, '.')}`;
    },
    java(request) {
      return request.replace(/\/|\\/g, '.');
    }
  };

  const javaResolver = request => {
    if (request.startsWith('@java/')) {
      return tryGetJavaObject(
        request.split('@java/')[1].replace(/\\|\//g, '.')
      );
    }
  };

  const shorthandResolver = request => {
    const module = request.split(/\.|\\|\//g)[0].toLowerCase();
    if (SHORTHAND_NAMESPACES[module]) {
      return tryGetJavaObject(SHORTHAND_NAMESPACES[module](request));
    }
  };

  const internalResolvers = [javaResolver, shorthandResolver];

  function tryGetJavaObject(request) {
    try {
      return Java.type(request);
    } catch (ex) {
      const fallbackPackage = __cauldron__.evalScript(
        `Packages.${request}`,
        'internal/bootstrap/loaders.js'
      );
      return fallbackPackage;
    }
  }

  let process;

  global.console = {
    log,
    warn(msg) {
      log(msg, 'd', false);
    },
    debug(msg) {
      log(msg, 'a', true);
    },
    error(msg) {
      log(msg, 'c', false);
    },
    trace: log
  };

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
      const script = __cauldron__.readFile(this.filename);
      const wrapped = NativeModule.wrap(script);
      const args = buildRequireArgs(this);
      const compiled = evalScript(wrapped, this.filename);
      const source = compiled.apply(null, args);
      NativeModule._source[this.id] = source;
      this.loaded = true;
      this.loading = false;
      return this.exports;
    }

    static require(id) {
      for (const resolver of internalResolvers) {
        const resolved = resolver(id);
        if (resolved) return resolved;
      }
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
      return id.startsWith('internal/');
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
    process,
    __cauldron__,
    NativeModule
  ];
  process = global.process = NativeModule.require('internal/process/core');
  global.Buffer = NativeModule.require('internal/buffer').Buffer;
  global.debugMessages = process.config.debugMessages;

  NativeModule.$$bootstrap();

  return loaderExports;
})();
