const EventEmitter = require('events');
const { methods } = require('internal/http/constants');

const CHUNK_CEILING = 1024;

function parseRequestData(data) {
  const headers = Object.create(null);
  const regex = /([\w-]+): (.*)/g;
  let temp;
  while ((temp = regex.exec(data))) {
    headers[temp[1]] = temp[2];
  }
  temp = data.match(/(\w+)\s+(.*?)\s+(.*)/);
  const method = temp[1].toUpperCase();
  const path = temp[2];
  const protocol = temp[3];
  let body = null;
  if (headers['Content-Length']) {
    body = data.split('\r\n\r\n')[1];
  }
  return { method, path, protocol, headers, body };
}

/**
 * A thin wrapper around data that is to be sent to an HTTP server. By the
 * time this object has been created, it's already been queued in the server's
 *
 */
class ClientRequest extends EventEmitter {
  constructor(data, socket) {
    super();
    this.socket = socket;
    this.aborted = false;
    this.writeEnabled = false;
    this.writeFinished = false;
    this.maxHeaderCount = 128;
    this._data = data;
    this._isProcessed = false;
  }

  _process() {
    this._isProcessed = true;
    const { method, path, protocol, headers, body } = parseRequestData(
      this._data
    );
    this.method = method;
    this.path = path;
    this.protocol = protocol;
    this.headers = headers;
    this.body = body;
  }

  abort() {
    this.aborted = true;
  }

  end(data, encoding, callback) {
    this.writeFinished = true;
  }

  flushHeaders() {
    //
  }

  getHeader(name) {
    return this._headers[name];
  }

  removeHeader(name) {
    delete this._headers[name];
  }

  setHeader(name, value) {
    this._headers[name] = value;
  }
}

module.exports = ClientRequest;
