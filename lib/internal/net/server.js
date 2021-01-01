const { $$isolate$$ } = require('cauldronjs');
const EventEmitter = require('events');
const Socket = require('internal/net/socket');
const { isException } = require('internal/util/java');

const NetServer = Java.type('com.cauldronjs.core.net.NetServer');

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

    if (callback) {
      this.on('listen', callback);
    }

    const server = createServerSocket(port, backlog, host);
    this._serverSocket = server;

    const listenerId = Server.createConnectionListener(this, () => {
      this._serverSocket.accept((err, socket) => {
        if (err) {
          this.emit('error', err);
        } else {
          this._connections++;
          const connectedSocket = new Socket({ socket });
          connectedSocket.on('close', () =>
            this.emit('disconnected', connectedSocket)
          );
          this.emit('connection', connectedSocket);
        }
      });
    });
    this.emit('listen');

    $$isolate$$.on('close', () => {
      $$cauldron$$.cancelTask(listenerId);
      this._serverSocket.close();
    });
  }

  address() {
    return this._serverSocket.getServer().getLocalSocketAddress().toString();
  }

  close(callback) {
    //
    this.emit('close');
  }

  getConnections(callback) {
    callback(this._connections);
  }

  ref() {
    //
  }

  unref() {
    //
  }

  static createConnectionListener(server, handler) {
    return $$cauldron$$.scheduleRepeatingTask(
      runnable(() => {
        handler();
        if (server._internalListen) {
          console.log('Running internal listener');
          server._internalListen();
        }
      }),
      SOCKET_ACCEPT_TIMEOUT,
      SOCKET_ACCEPT_TIMEOUT
    );
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

module.exports = Server;
