const Server = require('internal/net/server');
const ClientRequest = require('internal/http/client_request');
const ServerResponse = require('internal/http/server_response');
const Queue = require('internal/queue');

const { stringFromByteArray } = Java.type('com.cauldronjs.utils.JsUtils');
const run = internalBinding('Runnable').create;

class HTTPServer extends Server {
  constructor() {
    super({ allowHalfOpen: false, pauseOnConnect: false });
    this._clientRequests = new Queue();
    this._activeConnections = Object.create(null);

    // this isn't being added to the event emitter, need to investigate why
    this.on('connection', socket => {
      console.log('Handling connection');
      this._activeConnections[socket.uuid] = socket;
      socket.on('data', data => {
        const datastr = stringFromByteArray(data);
        const request = new ClientRequest(datastr, socket);
        const response = new ServerResponse(request, socket);
        this._clientRequests.push([request, response]);
        this.emit('connect', request, response);
        console.log('Emitted connect');
      });
    });

    this.on('disconnected', socket => {
      delete this._activeConnections[socket.uuid];
    });

    this._watcherId = $$cauldron$$.scheduleRepeatingTask(
      run(() => {
        const MAX_REQUESTS_HANDLED = 20;
        for (let i = 0; i < MAX_REQUESTS_HANDLED; ) {
          console.log('Handling request queue');
          if (this._clientRequests.size() === 0) {
            break;
          }
          const [request, response] = this._clientRequests.pop();
          // process the request and send the response
          if (!response.writableEnded) {
            this._clientRequests.push([request, response]);
            continue;
          }
          i++;
          // only increment if there's work to do

          // TODO: allow for chunking, for now this only sends it all at once
          const msg = response.commit();
          response.socket.write(msg);
          response.close();
          console.log('Finished queue entry');
        }
      }),
      20,
      20
    );
  }

  setTimeout(msecs, callback) {
    this._serverSocket.setSoTimeout(msecs);
  }
}

Object.defineProperty(HTTPServer.prototype, 'timeout', {
  get: () => this._serverSocket.getSoTimeout()
});

module.exports = HTTPServer;
