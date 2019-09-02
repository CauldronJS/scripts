/**
 * HTTP Client Request class
 *
 * @file    \lib\internal\http\client_request.js
 * @author  Justin Cox <https://conji.me>
 */

const { EventEmitter } = require('events');
const URL = require('@java/java.net.URL');

class ClientRequest extends EventEmitter {
  constructor() {
    super();

    this.aborted = false;
    this.finished = false;
    this.connection = null;
    this.path = null;
    this.maxHeadersCount = 2000;
    this.noDelay = false;

    this._headers = Object.create(null);
    this._method = 'GET';

    this.writableEnded = false;
    this.writableFinished = false;
  }

  abort() {
    if (this.aborted) return;
    this.emit('abort');
    this.aborted = true;
    // actually abort
  }

  end(data = null, encoding = 'utf-8', callback = null) {
    this.finished = true;
    this.emit('finish');
    // actually send and finish
    const urlConnection = new URL(this.path);
    urlConnection.setRequestMethod(this._method);
    // TODO: set headers
    return this;
  }

  flushHeaders() {}

  getHeader(name) {
    return this._headers[name];
  }

  removeHeader(name) {
    delete this._headers[name];
  }

  setHeader(name, value) {
    this._headers[name] = value;
  }

  setNoDelay(noDelay) {
    this.noDelay = noDelay;
  }

  setSocketKeepAlive(enable, initialDelay) {}

  setTimeout(timeout, callback) {}

  write(chunk, encoding, callback) {}
}

module.exports = ClientRequest;
