const EventEmitter = require('events');
const ClientRequest = require('internal/http/client_request');
const { STATUS_CODES } = require('internal/http/constants');

const { toByteArray } = Java.type('com.cauldronjs.utils.JsUtils');

const getHeaderEntriesFor = (name, value) => {
  if (Array.isArray(value) && typeof value !== 'string') {
    return value.reduce((entries, val) => `${name}: ${val}`, []);
  } else {
    return `${name}: ${value.toString()}`;
  }
};

class ServerResponse extends EventEmitter {
  /**
   *
   * @param {ClientRequest} request
   */
  constructor(request, socket) {
    super();
    this.writableEnded = false;
    this.writableFinished = false;
    this.statusMessage = undefined;
    this.statusCode = 200;
    this.socket = socket;
    this.sendDate = Date.UTC();
    this.headersSent = false;
    this.headers = request.headers;
    this.trailers = Object.create(null);
    this._writeBuffer = [];
  }

  end(data, encoding, callback) {
    this.write(data, encoding, callback);
    this.writableEnded = true;
  }

  commit() {
    this.writableFinished = true;
    const body = this._writeBuffer.join('\r\n');
    this.headers['Content-Length'] = toByteArray(body).length;
    const headers = Object.keys(this.headers)
      .reduce(
        (headersCollection, name) => [
          ...headersCollection,
          `${name}: ${this.headers[name]}`
        ],
        []
      )
      .join('\r\n');
    const statusCode = this.statusCode || 200;
    const statusMessage = this.statusMessage || STATUS_CODES[statusCode];
    const result = `HTTP/1.1 ${statusCode} ${statusMessage}\r\n${headers}\r\n\r\n${body}`;
    delete this._writeBuffer;
    return result;
  }

  write(content, encoding, callback) {
    // TODO: allow more than strings? And encoding
    this._writeBuffer.push(content);
  }

  hasHeader(name) {
    return !!this.headers[name];
  }

  headersSent() {
    return this.headersSent;
  }

  getHeaders() {
    return this.headers;
  }

  removeHeader(name) {
    delete this.headers[name];
  }

  setHeader(name, value) {
    this.headers[name] = value;
  }

  close() {
    this.socket._flush();
    this.socket.close();
  }
}

module.exports = ServerResponse;
