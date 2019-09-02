const EventEmitter = require('events');

class ClientRequest extends EventEmitter {
  constructor(options = {}) {
    super();
    this.statusCode = options.statusCode;
    this._data = options.data;
  }
}

module.exports = ClientRequest;
