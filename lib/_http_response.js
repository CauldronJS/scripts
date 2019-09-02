const EventEmitter = require('events');

class ServerResponse extends EventEmitter {
  constructor(options = {}) {
    super();
    this.statusCode = options.statusCode;
    this._data = options.data;
  }
}

module.exports = ServerResponse;
