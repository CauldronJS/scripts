const vm = require('internal/cauldron/vm');
const os = require('os');
const { EventEmitter } = require('events');
const { Runnable } = require('java/lang');
const {
  getBukkitVersion,
  getMinecraftVersion
} = require('internal/util/version');

const scheduler = Bukkit.getScheduler();

const runnable = run => Java.extend(Runnable, { run });

// TODO: generate this in the engine and bind it somewhere
const ENGINE_VARS = {
  platform: 'spigot'
};

/**
 * This needs to be kept up to date with the versions of NodeJS we support
 */
const NODE_VERSION_SUPPORT = 'v12.9.1';

class ProcessConfig {
  constructor() {
    this.variables = {
      ...ENGINE_VARS,
      ...JSON.parse(__cauldron__.readFile('package.json'))
    };
    this.targetDefaults = {};
  }
}

class Process extends EventEmitter {
  constructor() {
    super();
    this.config = new ProcessConfig();
    this.mainModule = this.config.variables.main;
    this.env = {
      NODE_ENV: 'cauldron',
      BUKKIT_VERSION: getBukkitVersion(),
      MINECRAFT_VERSION: getMinecraftVersion()
    };
    this.platform = os.platform();
    // TODO
    this.stderr = null;
    this.stdin = null;
    this.stdout = null;

    this.version = NODE_VERSION_SUPPORT;
  }

  cwd() {
    return __cauldron__.getDataFolder().getPath();
  }

  nextTick(callback, ...args) {
    scheduler.runTaskLater(
      runnable(() => {
        callback(args);
      })
    );
  }

  binding(moduleName) {
    if (!vm.modules[moduleName]) {
      vm.modules[moduleName] = Object.create(null);
    }
    return vm.modules[moduleName];
  }

  emitWarning(msg, type, code) {
    console.warn(`[${type}/${code}] ${msg}`);
  }

  _rawDebug(msg) {
    console.debug(msg);
  }
}

const processInstance = new Process();

module.exports = processInstance;
