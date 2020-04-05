const Server = require('internal/net/server');
const ClientRequest = require('internal/http/client_request');
const ServerResponse = require('internal/http/server_response');
const Queue = require('internal/queue');

const { stringFromByteArray } = Java.type('com.cauldronjs.utils.JsUtils');
const run = internalBinding('Runnable').create;

class HTTPServer extends Server {
  constructor() {
    super({
      allowHalfOpen: false,
      pauseOnConnect: false
    });
    this._clientRequests = new Queue();
    this._activeConnections = Object.create(null);

    this.on('connection', socket => {
      if (!socket) return;
      this._activeConnections[socket.uuid] = socket;
      socket.on('data', data => {
        const datastr = stringFromByteArray(data, 'UTF-8');
        const request = new ClientRequest(datastr, socket);
        this._clientRequests.push([request]);
      });
    });
    this.emit('connection', null);

    this.on('disconnected', socket => {
      delete this._activeConnections[socket.uuid];
    });

    const watcherId = $$cauldron$$.scheduleRepeatingTask(
      run(() => {
        const MAX_REQUESTS_HANDLED = 20;
        for (let i = 0; i < MAX_REQUESTS_HANDLED; ++i) {
          if (this._clientRequests.size() === 0) {
            break;
          }
          const [request, response] = this._clientRequests.pop();
          if (!request._isProcessed) {
            request._process();
            this._clientRequests.push([
              request,
              new ServerResponse(request, request.socket)
            ]);
            continue;
          }
          // try {
          this.emit('connect', request, response);
          // TODO: allow for chunking, for now this only sends it all at once
          const msg = response.commit();
          response.socket.write(msg);
          // } catch (err) {
          //   // close the socket
          //   console.log('Response errored: ' + err.toString());
          //   response.statusCode = 502;
          //   response.end(err.toString());
          // }

          // process the request and send the response
          if (!response.writableEnded) {
            this._clientRequests.push([request, response]);
          } else {
            response.close();
          }
        }
      }),
      20,
      20
    );

    this.on('close', () => $$cauldron$$.cancelTask(watcherId));
  }

  setTimeout(msecs, callback) {
    this._serverSocket.setSoTimeout(msecs);
  }

  _internalListener() {
    //
  }
}

Object.defineProperty(HTTPServer.prototype, 'timeout', {
  get: () => this._serverSocket.getSoTimeout()
});

module.exports = HTTPServer;
