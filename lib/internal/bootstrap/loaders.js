/**
 * bootstrap/loader.js
 * ===================
 * This file is in charge of loading internal modules. This file is called before any
 * others in the core in order to setup proper and consistent loading (besides plugin.js).
 * After this is loaded, it is passed to bootstrap/core.js. The require given to these
 * internal modules cannot load external modules, and the global require cannot load these
 * modules.
 */

global.Bukkit = Java.type('org.bukkit.Bukkit');
global.__cauldron__ = Bukkit.getPluginManager().getPlugin('Cauldron');

global.evalScript = (script, filename) =>
  __cauldron__.evalScript(script, filename || 'eval');

global.log = (msg, level, verbose) => {
  if (verbose && !debugMessages) return;
  if (!level) level = '7';
  if (msg === undefined) {
    Bukkit.getConsoleSender().sendMessage(`\xA7${level}[Cauldron] undefined`);
  } else if (msg === null) {
    Bukkit.getConsoleSender().sendMessage(`\xA7${level}[Cauldron] null`);
  } else if (msg instanceof Array) {
    Bukkit.getConsoleSender().sendMessage(`\xA7${level}[Cauldron] [\n${JSON.stringify(msg, ' ', '\t').replace(/\t/g, '  ')}`);
  } else if (typeof msg === 'string') {
    Bukkit.getConsoleSender().sendMessage(`\xA7${level}[Cauldron] ${msg}`);
  } else {
    Bukkit.getConsoleSender().sendMessage(`\xA7${level}[Cauldron] ${JSON.stringify(msg, ' ', '\t').replace(/\t/g, '  ')}`);
  }
};

(function () {
  const wrapper = [
    '(function (exports, module, require, process, plugin, NativeModule) {',
    '\n})'
  ];
  global.process = configureProcess();
  global.debugMessages = process.config.verbose_logging;

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
      const script = fs_read(this.filename);
      const wrapped = NativeModule.wrap(script);
      const args = [
        this.exports,
        this,
        NativeModule.require,
        process,
        __cauldron__,
        NativeModule
      ];
      const compiled = evalScript(wrapped, this.filename);
      const source = compiled.apply(null, args);
      NativeModule._source[this.id] = source;
      this.loaded = true;
      this.loading = false;
      return this.exports;
    }

    static require(id) {
      if (id.startsWith('@java/')) return Java.type(id.replace('@java/', ''));
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
      try {
        return __cauldron__.getFile(`lib/${id}.js`).exists();
      } catch (ex) {
        return false;
      }
    }

    static wrap(script) {
      return wrapper[0] + script + wrapper[1];
    }

    static getCached(id) {
      return NativeModule._cache[id];
    }
  }

  NativeModule._source = {}; // TODO: setup natives
  NativeModule._cache = {};

  const config = {}; // TODO: setup config

  const loaderExports = {
    NativeModule: NativeModule
  };
  const loaderId = 'internal/bootstrap/loaders';

  function fs_read(location) {
    return __cauldron__.readFile(location);
  }

  function configureProcess() {
    const process = {
      config: {},
      cwd() {
        return __cauldron__.getDataFolder().getPath();
      },
      env: {
        NODE_ENV: 'cauldron'
      }
    };
    const config = fs_read('package.json');
    try {
      const json = JSON.parse(config);
      process.config = json;
      process.mainModule = process.config.main;
    } catch (ex) {
      const err = new Error('Error reading package.json: ' + ex.message);
      throw err;
    }

    return process;
  }

  NativeModule.require('internal/process/core');
  NativeModule.require('internal/bootstrap/core');

  return loaderExports;
})();
