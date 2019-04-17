const ProcessBuilder = require('@java/java.lang.ProcessBuilder');
const Redirect = ProcessBuilder.Redirect;
const EventEmitter = require('events').EventEmitter;
const internalUtil = require('internal/util');
const path = require('path');
const os = require('os');
const async = require('async');

const workingDirectory = __cauldron__.getDataFolder();

const childProcesses = [];

class ChildProcess extends EventEmitter {
  constructor (processBuilder, stdio) {
    super();
    const proc = processBuilder.start();
    this._process = proc;
    this.killed = false;
    this.connected = true;
    this.stdio = stdio;
    this.stderr = proc.getErrorStream();
    this.stdin = proc.getInputStream();
    this.stdout = proc.getOutputStream();
    this.pid = -1;
  }

  send (message, options, callback) {
    this.stdout.write(message);
    this.stdout.flush();
  }

  kill (signal) {
    this._process.destroy();
    this.killed = true;
    this.emit('exit');
  }

  _getPid () {
    if (os.platform === 'win32') {
      const handle = this.handle;
    }
  }

  _waitSync () {
    this._process.waitFor();
    this.status = this._process.exitValue();
    this.output = [internalUtil.getStringFromBuffer(this.stdin)];
    return this;
  }

  _wait () {
    return new Promise((resolve, reject) => {
      async(() => {
        try {
          this._process.waitFor();
          this.status = this._process.exitValue();
          this.output = [internalUtil.getStringFromBuffer(this.stdin)];
          resolve(this);
        } catch (ex) {
          reject(ex);
        }
      });
    });
  }
}

function createProcessBuilder (command, args, options) {
  var pbArgs = [command];
  if (args) {
    for (var i = 0; i < args.length; ++i) {
      pbArgs.push(args[i]);
    }
  }
  const StringArray = Java.type('java.lang.String[]');
  var processBuilder = new ProcessBuilder(Java.to(pbArgs, StringArray));
  options = options || {
    detached: false,
    stdio: ['pipe', 'pipe', 'pipe']
  };
  if (typeof options.stdio === 'string') {
    options.stdio = internalUtil.createArrayFromString(options.stdio, 3);
  }
  if (options.stdio[0] === process.stdin || options.stdio[0] === 0) { options.stdio[0] = 'inherit'; }
  if (options.stdio[1] === process.stdout || options.stdio[0] === 1) { options.stdio[1] = 'inherit'; }
  if (options.stdio[2] === process.stderr || options.stdio[0] === 2) { options.stdio[2] = 'inherit'; }
  var stdin = getRedirectFromString(options.stdio[0]);
  var stdout = getRedirectFromString(options.stdio[1]);
  var stderr = getRedirectFromString(options.stdio[2]);

  if (stdin) processBuilder.redirectInput(stdin);
  if (stdout) processBuilder.redirectOutput(stdout);
  if (stderr) processBuilder.redirectError(stderr);

  processBuilder.redirectErrorStream(true);
  processBuilder.directory(workingDirectory);

  const proc = new ChildProcess(processBuilder, options.stdio);
  childProcesses[proc.pid]
}

function spawnSync (command, args, options) {
  var proc = createProcessBuilder(command, args, options);
  return proc;
}

function spawn (command, args, options) {
  var proc = createProcessBuilder(command, args, options);
  return proc;
}

function killAll () {
  childProcesses.forEach(proc => proc.kill());
}

function getRedirectFromString (input) {
  switch (input) {
    case 'pipe':
      return Redirect.PIPE;
    case 'inherit':
      return Redirect.INHERIT;
    case 'ignore':
      return false;
    default:
      return false;
  }
}

module.exports = {
  spawnSync,
  spawn,
  killAll
};
