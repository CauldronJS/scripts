var JSocket = require('@java/java.net.Socket');
var InetSocketAddress = require('@java/java.net.InetSocketAddress');
var EventEmitter = require('events');
var errors = require('errors').codes;

function Socket(options) {
  // this is very much just a thin wrapper. Nothing is done in this file, only redirects
  // the only readable portion of the socket is the InputStream
  EventEmitter.call(this);
  this._baseConnection = null;
  this.bufferSize = -1;
  this.bytesRead = 0;
  this.bytesWritten = 0;
  this.connecting = false;
  this.destroyed = false;
  this.localAddress = null;
  this.localPort = null;
  this.remoteAddress = null;
  this.remoteFamily = null;
  this.remotePort = null;

  this._jSocket = new JSocket();
}

Socket.prototype.connect = function() {
  if (Array.isArray(arguments[0])) arguments = arguments[0];
  var args = Array.slice(arguments, 0);
  if (typeof args[0] === 'object') {
    return connectWithOptions(this, args[0], args[1]);
  } else if (typeof args[0] === 'number') {
    return connectWithPort(this, args[0], args[1], args[2]);
  } else {
    return connectWithPath(this, args[0], args[1]);
  }
};

Socket.prototype.destroy = function(exception) {
  this._jSocket.close();
  this.destroyed = true;
  // TODO: send exception
  return this;
};

Socket.prototype.end = function(data, encoding) {
  // TODO: send data
  this.write(data, encoding, function() {
    this._jSocket.shutdownOutput();
  });
};

Socket.prototype.setKeepAlive = function(enable, initialDelay) {
  this._jSocket.setKeepAlive(enable);
};

Socket.prototype.setNoDelay = function(noDelay) {
  this._jSocket.setTcpNoDelay(noDelay);
};

Socket.prototype.setTimeout = function(timeout, callback) {
  this._jSocket.setSoTimeout(timeout);
  if (callback) callback();
};

Socket.prototype.write = function(data, encoding, callback) {
  this._jSocket.getOutputStream().write(data.getBytes ? data.getBytes() : data);
  if (callback) callback();
};

var connect = (createConnection = function() {
  var socket = new Socket();
  socket.connect(arguments);
  return socket;
});

function connectWithOptions(socket, options, connectListener) {
  var port = options.port;
  var host = options.host || 'localhost';
  var localAddress = options.localAddress;
  var localPort = options.localPort;
  var family = options.family || 4;
  var hints = options.hints;
  var lookup = options.lookup;
  var path = options.path;

  if (!path) {
    // we're connecting over TCP
    return connectWithPort(socket, port, host, connectListener);
  } else {
    // connecting over IPC
    return connectWithPath(socket, path, connectListener);
  }
}

function connectWithPath(socket, path, connectListener) {
  throw new errors.ERR_METHOD_NOT_IMPLEMENTED('IPC');
}

function connectWithPort(socket, port, host, connectListener) {
  var socketAddress = new InetSocketAddress(host || 'localhost', port);
  socket._jSocket.connect(socketAddress);
  if (connectListener) {
    connectListener(socket);
  }
  socket.localAddress = socket._jSocket.getLocalAddress().toString();
  socket.localPort = socket._jSocket.getLocalPort();
  socket.remoteAddress = socket._jSocket
    .getRemoteSocketAddress()
    .getHostString();
  socket.remotePort = socket._jSocket.getRemoteSocketAddress().getPort();
  return socket;
}

module.exports = {
  Socket,
  connect,
  createConnection
};
