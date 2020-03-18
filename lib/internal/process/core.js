const vm = require('internal/cauldron/vm');
const os = require('os');
const { EventEmitter } = require('events');
const { Runnable } = require('java/lang');
const fs = require('internal/cauldron/fs');

const runnable = run => Java.extend(Runnable, { run });

// TODO: generate this in the engine and bind it somewhere
const ENGINE_VARS = {
  impl: $$cauldron$$.getTarget().getPlatform()
};

/**
 * This needs to be kept up to date with the versions of NodeJS we support
 */
const NODE_VERSION_SUPPORT = 'v12.9.1';

class ProcessConfig {
  constructor() {
    this.variables = {
      ...ENGINE_VARS,
      ...JSON.parse(fs.read('package.json'))
    };
    this.targetDefaults = {};
  }
}

class Process extends EventEmitter {
  constructor() {
    super();
    this.config = new ProcessConfig();
    this.argv = this.config.variables.argv;
    this.mainModule = this.config.variables.main;
    this.env = {
      NODE_ENV: 'cauldron'
    };
    this.platform = os.platform();
    // TODO
    this.stderr = null;
    this.stdin = null;
    this.stdout = null;

    this.version = NODE_VERSION_SUPPORT;
  }

  cwd() {
    return $$cauldron$$.getDataFolder().getPath();
  }

  nextTick(callback, ...args) {
    $$cauldron$$.scheduleTask(
      runnable(() => {
        callback(args);
      }),
      0
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
