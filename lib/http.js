/**
 * The HTTP library for Cauldron, with compat with NodeJS
 *
 * @file    \lib\http.js
 * @author  Justin Cox <https://conji.me>
 */

const { Agent, globalAgent } = require('_http_agent');
const { ClientRequest } = require('_http_client');
const { methods } = require('_http_common');
const { IncomingMessage } = require('_http_incoming');
const { OutgoingMessage } = require('_http_outgoing');
const {
  _connectionListener,
  STATUS_CODES,
  Server,
  ServerResponse
} = require('_http_server');

// default value of 80kb
// ref: https://github.com/nodejs/node-v0.x-archive/blob/597eb6a5aebbc2afbd76d16e568a86ed28509bc7/deps/http_parser/http_parser.h#L56
const maxHeaderSize = 80 * 1024;

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
