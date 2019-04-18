const EventEmitter = require('events').EventEmitter;
const util = require('util');
const internalUtil = require('internal/util');
const Server = require('internal/net/_http_server');
const Socket = require('internal/net/_http_socket');
const { isIP, isIPv4, isIPv6 } = require('internal/net/utils');

function connect () {
  if (typeof arguments[0] === 'string') {
    // connect(path, connectListener)
  } else if (typeof arguments[0] === 'number') {
    // connect(port, host, connectListener)
  } else {
    // connect(options, connectListener)
  }
}

function createConnection () {
  if (typeof arguments[0] === 'string') {
    // createConnection(path, connectListener)
  } else if (typeof arguments[0] === 'number') {
    // createConnection(port, host, connectListener)
  } else {
    // createConnection(options, connectListener)
  }
}

function createServer (options, connectionListener) {

}

module.exports = {
  Server,
  Socket,
  isIP,
  isIPv4,
  isIPv6,
  connect,
  createConnection,
  createServer
}
