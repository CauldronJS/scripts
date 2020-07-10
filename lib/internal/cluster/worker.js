const EventEmitter = require('events');

const SIGTERM = 'SIGTERM';

class Worker extends EventEmitter {
  constructor(options) {
    super();
    this.exitedAfterDisconnect = false;
    this.state = options.state || 'none';
    this.id = options.id | 0;
    this._isConnected = false;
    this._isDead = false;
    if (options.process) {
      this.process = options.process;
      this.process.on('error', (code, signal) =>
        this.emit('error', code, signal)
      );
      this.process.on('message', (message, handle) =>
        this.emit('message', message, handle)
      );
    }
  }

  isConnected() {
    return this.process.connected;
  }

  isDead() {
    return this.process.exitCode !== null || this.process.signalCode !== null;
  }

  send(...args) {
    this.process.send(args);
  }

  kill(signal = SIGTERM) {
    this.destroy(signal);
  }

  disconnect() {
    //
  }
}

module.exports = Worker;
