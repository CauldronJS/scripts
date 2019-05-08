const ProcessBuilder = require('@java/java.lang.ProcessBuilder');
const Paths = require('@java/java.nio.file.Paths');
const Redirect = ProcessBuilder.Redirect;
const EventEmitter = require('events').EventEmitter;
const internalUtil = require('internal/util');
const path = require('path');
const os = require('os');
const async = require('async');

const childProcesses = [];

class ChildProcess extends EventEmitter {
  constructor(processBuilder, stdio) {
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

  send(message, options, callback) {
    this.stdout.write(message);
    this.stdout.flush();
  }

  kill(signal) {
    this._process.destroy();
    this.killed = true;
    this.emit('exit');
  }

  _getPid() {
    if (os.platform === 'win32') {
      const handle = this.handle;
    }
  }

  _waitSync() {
    this._process.waitFor();
    this.status = this._process.exitValue();
    this.output = [internalUtil.getStringFromBuffer(this.stdin)];
    return this;
  }

  _wait() {
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

function createProcessBuilder(command, args, options = {}) {
  var pbArgs = [command];
  if (args) {
    for (var i = 0; i < args.length; ++i) {
      pbArgs.push(args[i]);
    }
  }
  const StringArray = Java.type('java.lang.String[]');
  var processBuilder = new ProcessBuilder(Java.to(pbArgs, StringArray));
  let { stdio = ['pipe', 'pipe', 'pipe'], dir } = options;
  if (typeof stdio === 'string') {
    stdio = internalUtil.createArrayFromString(stdio, 3);
  }
  if (stdio[0] === process.stdin || stdio[0] === 0) {
    stdio[0] = 'inherit';
  }
  if (stdio[1] === process.stdout || stdio[0] === 1) {
    stdio[1] = 'inherit';
  }
  if (stdio[2] === process.stderr || stdio[0] === 2) {
    stdio[2] = 'inherit';
  }
  var stdin = getRedirectFromString(stdio[0]);
  var stdout = getRedirectFromString(stdio[1]);
  var stderr = getRedirectFromString(stdio[2]);

  if (stdin) processBuilder.redirectInput(stdin);
  if (stdout) processBuilder.redirectOutput(stdout);
  if (stderr) processBuilder.redirectError(stderr);

  processBuilder.redirectErrorStream(true);
  const file = Paths.get(dir || process.cwd()).toFile();
  console.debug(file.getAbsolutePath());
  processBuilder.directory(file);

  const proc = new ChildProcess(processBuilder, stdio);
  childProcesses[proc.pid];
}

function spawnSync(command, args, options) {
  var proc = createProcessBuilder(command, args, options);
  return proc;
}

function spawn(command, args, options) {
  var proc = createProcessBuilder(command, args, options);
  return proc;
}

function killAll() {
  childProcesses.forEach(proc => proc.kill());
}

function getRedirectFromString(input) {
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
