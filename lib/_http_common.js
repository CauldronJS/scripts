/**
 * All constants to be used within HTTP
 *
 * @file    \lib\_http_common.js
 * @author  Justin Cox <https://conji.me>
 */

exports.methods = ['GET', 'POST', 'PUT', 'DELETE'];

exports.DEFAULT_AGENT_OPTIONS = {
  keepAlive: false,
  keepAliveMsecs: 1000,
  maxSockets: Number.POSITIVE_INFINITY,
  maxFreeSockets: 256,
  timeout: 60000
};

// default value of 80kb
// ref: https://github.com/nodejs/node-v0.x-archive/blob/597eb6a5aebbc2afbd76d16e568a86ed28509bc7/deps/http_parser/http_parser.h#L56
exports.maxHeaderSize = 80 * 1024;
