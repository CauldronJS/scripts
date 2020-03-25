const Server = require('internal/net/server');

class HTTPServer extends Server {
  constructor() {
    super({ allowHalfOpen: false, pauseOnConnect: false });
  }

  setTimeout(msecs, callback) {
    this._serverSocket.setSoTimeout(msecs);
    this.emit('timeout');
    this.on('connection', socket =>
      socket.write('HTTP/1.1 200 OK\n\nHello world')
    );
  }
}

Object.defineProperty(HTTPServer.prototype, 'timeout', {
  get: () => this._serverSocket.getSoTimeout()
});

module.exports = HTTPServer;
