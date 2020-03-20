const EventEmitter = require('events');
const Socket = require('internal/net/socket');
const { getStringFromBuffer, isException } = require('internal/util/java');

const NetServer = internalBinding('NetServer');

const runnable = internalBinding('Runnable').create;

const SOCKET_ACCEPT_TIMEOUT = 20;

class Server extends EventEmitter {
  constructor(options, connectionListener) {
    super();
    const { allowHalfOpen = false, pauseOnConnect = false } = options;
    this._config = { allowHalfOpen, pauseOnConnect };
    if (connectionListener) {
      this.on('connection', connectionListener);
    }

    this._connections = 0;
    this._serverSocket = null;
    this.listening = false;
    this.maxConnections = Number.MAX_VALUE;
  }

  listen(...args) {
    let port, host, path, backlog, callback;
    if (typeof args[0] === 'object') {
      // listen(options, callback)
      port = args[0].port;
      host = args[0].port;
      path = args[0].path;
      backlog = args[0].backlog || 1;
      callback = args[1];
    } else if (typeof args[0] === 'string') {
      // listen(path, backlog, callback)
      path = args[0];
      if (typeof args[1] === 'function') {
        backlog = 1;
        callback = args[1];
      } else {
        backlog = args[1];
        callback = args[2];
      }
    } else if (typeof args[0] === 'number') {
      // listen(port, host, backlog, callback)
      port = args[0];
      host = args[1];
      if (typeof args[2] === 'function') {
        backlog = 1;
        callback = args[2];
      } else {
        backlog = args[2];
        callback = args[3];
      }
    } else {
      // listen(handle, backlog, callback)
      // TODO
    }

    const server = createServerSocket(port, backlog, host);
    this._serverSocket = server;

    this._listenerId = createConnectionListener(this, callback);

    $$isolate$$.onClose(() => {
      $$cauldron$$.cancelTask(this._listenerId);
      this._serverSocket.close();
      while (!this._serverSocket.isClosed()) {}
    });
  }

  address() {
    return this._serverSocket.getAddress().toString();
  }
}

function createServerSocket(port, backlog, host) {
  const server = NetServer.createServer(
    port,
    backlog || 1,
    host || 'localhost'
  );
  if (isException(server)) throw server;
  server.setSoTimeout(SOCKET_ACCEPT_TIMEOUT);
  return server;
}

function createConnectionListener(server, handler) {
  const interval = $$cauldron$$.scheduleRepeatingTask(
    runnable(() =>
      server._serverSocket.accept((err, socket) =>
        handler(err, new Socket({ socket }))
      )
    ),
    SOCKET_ACCEPT_TIMEOUT,
    SOCKET_ACCEPT_TIMEOUT
  );
  return interval;
}

Server.createServer = (options, connectionListener) => {
  if (typeof options === 'function') {
    connectionListener = options;
    options = { allowHalfOpen: false, pauseOnConnect: false };
  } else if (!options) {
    options = { allowHalfOpen: false, pauseOnConnect: false };
  }
  return new Server(options, connectionListener);
};

module.exports = Server;
