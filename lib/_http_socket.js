const JSocket = require('java/net/Socket');
const InetSocketAddress = require('java/net/InetSocketAddress');
const EventEmitter = require('events');
const errors = require('errors').codes;

class Socket {
  constructor(options) {
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
  connect(...args) {
    if (Array.isArray(args[0])) args = args[0];
    if (typeof args[0] === 'object') {
      return connectWithOptions(this, args[0], args[1]);
    } else if (typeof args[0] === 'number') {
      return connectWithPort(this, args[0], args[1], args[2]);
    } else {
      return connectWithPath(this, args[0], args[1]);
    }
  }
  destroy(exception) {
    this._jSocket.close();
    this.destroyed = true;
    // TODO: send exception
    return this;
  }
  end(data, encoding) {
    // TODO: send data
    this.write(data, encoding, function() {
      this._jSocket.shutdownOutput();
    });
  }
  setKeepAlive(enable, initialDelay) {
    this._jSocket.setKeepAlive(enable);
  }
  setNoDelay(noDelay) {
    this._jSocket.setTcpNoDelay(noDelay);
  }
  setTimeout(timeout, callback) {
    this._jSocket.setSoTimeout(timeout);
    if (callback) callback();
  }
  write(data, encoding, callback) {
    this._jSocket
      .getOutputStream()
      .write(data.getBytes ? data.getBytes() : data);
    if (callback) callback();
  }
}

const connect = (createConnection = function() {
  const socket = new Socket();
  socket.connect(arguments);
  return socket;
});

function connectWithOptions(socket, options, connectListener) {
  const port = options.port;
  const host = options.host || 'localhost';
  const localAddress = options.localAddress;
  const localPort = options.localPort;
  const family = options.family || 4;
  const hints = options.hints;
  const lookup = options.lookup;
  const path = options.path;

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
  const socketAddress = new InetSocketAddress(host || 'localhost', port);
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
