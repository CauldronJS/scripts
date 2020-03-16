const EventEmitter = require('events');
const Socket = require('internal/net/socket');
const { getStringFromBuffer } = require('internal/util/java');
const { InetAddress, ServerSocket } = require('java/net');

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

    this._serverSocket = internalBinding('NetServer').createServer(
      port,
      backlog,
      ''
    );

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
  const serverSocket = new ServerSocket(
    port,
    backlog,
    host ? InetAddress.getByName(host) : InetAddress.getLocalHost()
  );
  serverSocket.setSoTimeout(SOCKET_ACCEPT_TIMEOUT);
  return serverSocket;
}

function createConnectionListener(server, handler) {
  const interval = $$cauldron$$.scheduleRepeatingTask(
    runnable(() => {
      try {
        const socket = server._serverSocket.accept();
        const netSocket = new Socket({ socket });
        handler(netSocket);
      } catch (err) {
        if (err instanceof Java.type('java.net.SocketTimeoutException')) {
          // ignore
        } else {
          console.error(err);
        }
      }
    }),
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
