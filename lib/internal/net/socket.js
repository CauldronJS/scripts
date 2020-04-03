const EventEmitter = require('events');
const AsyncStream = require('internal/async_stream');

const { toByteArray } = Java.type('com.cauldronjs.utils.JsUtils');

const DEFAULT_CONFIG = {
  fd: null,
  allowHalfOpen: false,
  readable: false,
  writable: false
};

const DATA_CHUNK_LENGTH = 1024;

const generateUuid = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

class SocketDataChunk {
  constructor(data, position) {
    this.data = data;
    this.position = position;
  }
}

class Socket extends EventEmitter {
  constructor(options = DEFAULT_CONFIG) {
    super();
    this._options = options;
    this._readBuffer = Uint8Array;
    this._chunks = [];
    this._chunkPosition = 0;
    this._watcherId = -1;
    this._jsocket = options.socket;
    this.uuid = generateUuid();
    if (this._jsocket && this._jsocket.isConnected()) {
      // auto connect, but wait until the stack is clear
      this._beginWatchingSocket();
      this.emit('connect');
    }

    this.bytesRead = 0;
    this.bytesWritten = 0;
    // TODO: add functionality to make this work
    this.isReused = false;
  }

  // TODO: move this to server so we don't create a new worker for each socket and
  // instead have a master worker running all sockets
  _beginWatchingSocket() {
    const stream = new AsyncStream(this._jsocket.getInputStream());
    stream.start(() => !this._jsocket.isConnected());
    stream.on('data', data => {
      this._chunks.push(new SocketDataChunk(data));
      // end
      if (!stream.canRead()) {
        const data = Buffer.alloc(
          (this._chunks.length - 1) * DATA_CHUNK_LENGTH +
            this._chunks[this._chunks.length - 1].data.length
        );
        for (let i = 0; i < this._chunks.length; ++i) {
          const chunk = this._chunks[i];
          data.set(chunk.data, chunk.position * DATA_CHUNK_LENGTH);
        }
        this._resetChunks();
        this.emit('data', data);
      }
    });
    stream.on('stop', this.close);
    this._readStream = stream;
  }

  _resetChunks() {
    delete this._chunks;
    this._chunks = [];
    this._chunkPosition = 0;
  }

  address() {
    return {
      port: this._jsocket.getPort(),
      family: 'IPv4', // TODO: get this
      address: this._jsocket.getLocalAddress().getHostAddress()
    };
  }

  connect(...args) {
    //
  }

  close() {
    this._jsocket.shutdownOutput();
    $$cauldron$$.cancelTask(this._watcherId);
    this.emit('close');
  }

  destroy(exception) {
    //
  }

  end(data, encoding, callback) {
    this.emit('end');
  }

  pause() {
    $$cauldron$$.cancelTask(this._watcherId);
  }

  ref() {
    //
  }

  resume() {
    this._beginWatchingSocket();
  }

  setEncoding(encoding) {
    //
  }

  setKeepAlive(enable, initialDelay) {
    //
  }

  setNoDelay(noDelay) {
    //
  }

  setTimeout(timeout, callback) {
    //
  }

  unref() {
    //
  }

  write(data, encoding, callback) {
    if (!this._jsocket) return;

    const stream = this._jsocket.getOutputStream();
    if (typeof data === 'string') {
      stream.write(toByteArray(data));
    } else {
      stream.write(data);
    }

    if (callback) {
      callback();
    }
  }

  _flush() {
    this._jsocket.getOutputStream().flush();
  }
}

module.exports = Socket;
