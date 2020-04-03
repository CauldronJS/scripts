const EventEmitter = require('events');
const ClientRequest = require('internal/http/client_request');
const { STATUS_CODES } = require('internal/http/constants');

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
    this.sendDate = true;
    this.headersSent = false;
    this.headers = request.headers;
    this.trailers = Object.create(null);
    this._writeBuffer = [];
  }

  end(data, encoding, callback) {
    this.writableEnded = true;
  }

  commit() {
    this.writableFinished = true;
    // build headers string
    const headers = Object.keys(this.headers)
      .reduce(
        (headersArray, name) => [
          ...headersArray,
          ...getHeaderEntriesFor(name, this.headers[name])
        ],
        []
      )
      .join('\r\n');
    const body = this._writeBuffer.join('\r\n');
    const trailers = Object.keys(this.trailers)
      .reduce(
        (trailersArray, name) => [
          ...trailersArray,
          ...getHeaderEntriesFor(name, this.trailers[name])
        ],
        []
      )
      .join('\r\n');
    const statusCode = this.statusCode || 200;
    const statusMessage = this.statusMessage || STATUS_CODES[statusCode];
    const result = `HTTP/1.1 ${statusCode} ${statusMessage}\r\n${headers}\r\n${body}\r\n${
      trailers.length === 0 ? '' : trailers
    }`;
    delete this._writeBuffer;
    return result;
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
