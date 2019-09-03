const os = require('os');
const { EventEmitter } = require('events');
const Runnable = require('@java/java.lang.Runnable');

const scheduler = Bukkit.getScheduler();

const runnable = run => Java.extend(Runnable, { run });

/**
 * This needs to be kept up to date with the versions of NodeJS we support
 */
const NODE_VERSION_SUPPORT = 'v12.9.1';

class Process extends EventEmitter {
  constructor() {
    super();
    this.config = JSON.parse(__cauldron__.readFile('package.json'));
    this.mainModule = this.config.main;
    this.env = { NODE_ENV: 'cauldron' };
    // TODO: make this dynamic
    // this.impl = __cauldron__.getImplementation();
    this.impl = 'spigot';
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
}

const processInstance = new Process();

module.exports = processInstance;
