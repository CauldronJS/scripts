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
