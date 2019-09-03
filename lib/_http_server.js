/**
 * Represents an HTTP capable server
 *
 * @file    \lib\_http_server.js
 * @author  Justin Cox <https://conji.me>
 */

class Server {
  constructor(options, connectionListener) {
    this.allowHalfOpen = options.allowHalfOpen || false;
    this.pauseOnConnect = options.pauseOnConnect || false;
    this._connectionListener = connectionListener;
  }
  address() {}
  close(callback) {}
  getConnections(callback) {}
  listen(...args) {
    if (typeof args[0] === 'object') {
      return listenFromOptions(this, args[0], args[1]);
    } else if (typeof args[0] === 'number') {
      return listenFromPort(this, args[0], args[1], args[2], args[3]);
    } else {
      return listenFromPath(this, args[0], args[1], args[2]);
    }
  }
  ref() {}
  unref() {}
}

function createServer(options, connectionListener) {}

function listenFromOptions(server, options, callback) {}

function listenFromPath(server, path, backlog, callback) {}

function listenFromPort(server, port, host, backlog, callback) {}

module.exports = {
  Server,
  createServer
};

exports.statusCodes = {
  200: 'OK',
  201: 'Created',
  202: 'Accepted',
  203: 'Non-Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  226: 'IM Used',

  300: 'Multiple Choices',
  301: 'Moved Permanently',
  302: 'Found',
  303: 'See Other',
  304: 'Not Modified',
  305: 'Use Proxy',
  307: 'Temporary Redirect',
  308: 'Permanent Redirect',

  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Request Entity Too Large',
  414: 'Request-URI Too Long',
  415: 'Unsupported Media Type',
  416: 'Requested Range Not Satisfiable',
  417: 'Expectation Failed',
  418: "I'm a teapot",
  426: 'Upgrade Required',
  428: 'Precondition Required',
  429: 'Too Many Requests',
  431: 'Request Header Fields Too Large',
  444: 'No Response',
  449: 'Retry With',
  451: 'Unavailable For Legal Reasons',
  499: 'Client Closed Request',

  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  505: 'HTTP Version Not Supported',
  506: 'Variant Also Negotiates',
  509: 'Bandwidth Limit Exceeded',
  510: 'Not Extended',
  511: 'Network Authentication Required',
  512: 'Network read timeout error',
  599: 'Network connect timeout error'
};
