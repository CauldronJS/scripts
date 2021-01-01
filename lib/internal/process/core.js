const vm = require('internal/cauldron/vm');
const os = require('os');
const { EventEmitter } = require('events');
const fs = require('internal/cauldron/fs');
const { $$isolate$$ } = require('cauldronjs');

const runnable = internalBinding('Runnable').create;

function getEngineEnvVars() {
  const vars = {
    impl: internalBinding('target').getPlatform(),
    NODE_ENV: 'cauldron',
  };

  internalBinding('env_vars').forEach((key, value) => {
    vars[key] = value;
  });
  return vars;
}

/**
 * This needs to be kept up to date with the versions of NodeJS we support
 */
const NODE_VERSION_SUPPORT = 'v12.9.1';

class ProcessConfig {
  constructor() {
    this.variables = JSON.parse(fs.read('package.json'));
    this.targetDefaults = {};
  }
}

class Process extends EventEmitter {
  constructor() {
    super();
    this.config = new ProcessConfig();
    this.argv = this.config.variables.argv;
    this.mainModule = this.config.variables.main;
    this.platform = os.platform();
    // TODO
    this.stderr = null;
    this.stdin = null;
    this.stdout = null;

    this.version = NODE_VERSION_SUPPORT;
  }

  cwd() {
    return internalBinding('working_directory');
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

  toString() {
    return '[object process]';
  }
}

Object.defineProperty(Process.prototype, 'env', {
  get() {
    return getEngineEnvVars();
  },
});

const processInstance = new Process();

module.exports = {
  process: processInstance,
};
