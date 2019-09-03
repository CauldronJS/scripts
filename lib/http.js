/**
 * The HTTP library for Cauldron, with compat with NodeJS
 *
 * @file    \lib\http.js
 * @author  Justin Cox <https://conji.me>
 */

const { Agent, globalAgent } = require('_http_agent');
const { ClientRequest } = require('_http_client');
const { methods, maxHeaderSize } = require('_http_common');
const { IncomingMessage } = require('_http_incoming');
const { OutgoingMessage } = require('_http_outgoing');
const {
  _connectionListener,
  STATUS_CODES,
  Server,
  ServerResponse
} = require('_http_server');

const createServer = (opts, requestListener) =>
  new Server(opts, requestListener);

const request = (url, options, cb) => new ClientRequest(url, options, cb);

const get = (url, options, cb) => {
  const req = request(url, options, cb);
  req.end();
  return req;
};

module.exports = {
  _connectionListener,
  METHODS: methods.slice().sort(),
  STATUS_CODES,
  Agent,
  globalAgent,
  ClientRequest,
  IncomingMessage,
  OutgoingMessage,
  Server,
  ServerResponse,
  createServer,
  get,
  request
};

Object.defineProperty(module.exports, 'maxHeaderSize', {
  configurable: true,
  enumerable: true,
  get() {
    return maxHeaderSize;
  }
});
