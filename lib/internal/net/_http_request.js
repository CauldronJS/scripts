var EventEmitter = require('events');

function ClientRequest(options) {
  EventEmitter.call(this);
  options = options || {};
  this.statusCode = options.statusCode;
  this._data = options.data;
}

module.exports = ClientRequest;
