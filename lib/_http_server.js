class Server {
  constructor(options, connectionListener) {
    this.allowHalfOpen = options.allowHalfOpen || false;
    this.pauseOnConnect = options.pauseOnConnect || false;
    this._connectionListener = connectionListener;
  }
  address() {}
  close(callback) {}
  getConnections(callback) {}
  listen() {
    if (typeof arguments[0] === 'object') {
      return listenFromOptions(this, arguments[0], arguments[1]);
    } else if (typeof arguments[0] === 'number') {
      return listenFromPort(
        this,
        arguments[0],
        arguments[1],
        arguments[2],
        arguments[3]
      );
    } else {
      return listenFromPath(this, arguments[0], arguments[1], arguments[2]);
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
