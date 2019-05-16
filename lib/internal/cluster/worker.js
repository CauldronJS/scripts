const { EventEmitter } = require('events');

const SIGTERM = 'SIGTERM';

class Worker extends EventEmitter {
  constructor() {
    super();
    this.exitedAfterDisconnect = false;
    this.id = 0;
    this._isConnected = false;
    this._isDead = false;
    this.process = null;
  }

  isConnected() {
    return this._isConnected;
  }

  isDead() {}

  send(message, sendHandle, callback) {}

  kill(signal = SIGTERM) {}

  disconnect() {}
}

module.exports = Worker;
