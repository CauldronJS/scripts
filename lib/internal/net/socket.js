const EventEmitter = require('events');
const { BufferedReader, InputStreamReader } = require('java/io');
const { ENCODING_MAP } = require('internal/util/java');
const AsyncStream = require('internal/async_stream');

const { toByteArray, stringFromByteArray } = Java.type(
  'com.cauldronjs.utils.JsUtils'
);

const run = internalBinding('Runnable').create;

const DEFAULT_CONFIG = {
  fd: null,
  allowHalfOpen: false,
  readable: false,
  writable: false
};

const DATA_CHUNK_LENGTH = 1024;

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
    this._chunks = [];
    this._chunkPosition = 0;
    this._watcherId = -1;
    this._jsocket = options.socket;
    if (this._jsocket && this._jsocket.isConnected()) {
      // auto connect
      this._beginWatchingSocket();
      this.emit('connect');
    }

    this.bytesRead = 0;
    this.bytesWritten = 0;
  }

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
        console.log(`Socket returned ${stringFromByteArray(data, 'UTF-8')}`);
        this.emit('data', data);
      }
    });
    this._readStream = stream;
    // this._watcherId = $$cauldron$$.scheduleRepeatingTask(
    //   run(() => {
    //     try {
    //       if (!this._jsocket.isConnected()) {
    //         $$cauldron$$.cancelTask(this._watcherId);
    //         this._resetChunks();
    //         this.emit('close');
    //       } else {
    //         if (!hasDataToRead(this)) {
    //           return;
    //         }
    //         const inputStream = this._jsocket.getInputStream();
    //         const bytesToProcess =
    //           inputStream.available() > DATA_CHUNK_LENGTH
    //             ? DATA_CHUNK_LENGTH
    //             : inputStream.available();
    //         const startPos = this._chunkPosition * DATA_CHUNK_LENGTH;
    //         const chunkData = new ByteArray(bytesToProcess);

    //         this.bytesRead += inputStream.read(
    //           chunkData,
    //           startPos,
    //           bytesToProcess
    //         );
    //         const socketDataChunk = new SocketDataChunk(
    //           chunkData,
    //           this._chunkPosition
    //         );
    //         this._chunkDataPosition++;
    //         this._chunks.push(socketDataChunk);

    //         if (!hasDataToRead(this)) {
    //           const data = Buffer.alloc(
    //             (this._chunks.length - 1) * DATA_CHUNK_LENGTH +
    //               this._chunks.lastItem.data.length
    //           );
    //           for (let i = 0; i < this._chunks.length; ++i) {
    //             const chunk = this._chunks[i];
    //             data.set(chunk.data, chunk.position * DATA_CHUNK_LENGTH);
    //           }
    //           this._resetChunks();
    //           this.emit('data', data);
    //         }
    //       }
    //     } catch (err) {
    //       this.emit('error', err);
    //     }
    //   }),
    //   20,
    //   20
    // );
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

  destroy(exception) {
    //
  }

  end(data, encoding, callback) {
    this._jsocket.shutdownOutput();
    $$cauldron$$.cancelTask(this._watcherId);
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
    stream.write(toByteArray(data));

    stream.flush();
    if (callback) {
      callback();
    }
  }
}

module.exports = Socket;
