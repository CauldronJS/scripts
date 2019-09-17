const {
  PipedOutputStream,
  PipedInputStream,
  ObjectOutputStream,
  ObjectInputStream
} = require('java/io');
const { EventEmitter } = require('events');
const { ENCODING_MAP } = require('internal/util/java');
const { ERR_METHOD_NOT_IMPLEMENTED } = require('internal/errors').codes;
const Writable = require('internal/streams2/writable');

class Readable extends EventEmitter {
  /**
   *
   * @param {{objectMode: boolean, encoding: string, destroy: () => void, read: (size: number), autoDestroy: boolean, emitClose: boolean}} options
   */
  constructor(options) {
    super();
    this._readableIn = new ObjectInputStream(
      options.inputStream || new PipedInputStream()
    );
    this._readableOut = new ObjectOutputStream(
      options.outputStream || new PipedOutputStream(this._readableIn)
    );

    this.options = options;

    this.writableObjectMode = !!options.objectMode;
    this._isPaused = false;
    this._encoding = ENCODING_MAP[options.encoding || 'utf8'];
    this.emitClose = options.emitClose === undefined ? true : options.emitClose;
    this.autoDestroy = !!options.autoDestroy;

    this.destroyed = false;
    this.readable = true;
    this.readableEncoding = this._encoding;
    this.readableEnded = false;
    this.readableHighWaterMark = options.highWaterMark || 16 * 1024;

    if (options) {
      if (typeof options.read === 'function') {
        this._read = options.read;
      }
      if (typeof options.destroy === 'function') {
        this._destroy = options.destroy;
      }
    }
  }

  setEncoding(encoding) {
    this._encoding = ENCODING_MAP[encoding];
    return this;
  }

  push(v) {
    if (v === null) {
      // end the stream and close it
    }
    if (typeof v === 'string') {
      this._readableOut.writeChars(v);
    } else if (v instanceof Buffer || v instanceof Uint8Array) {
      this._readableOut.write(v.values());
    } else if (this.writableObjectMode) {
      this._readableOut.writeObject(v);
    }
    if (this._isPaused) {
      this._readableOut.flush();
    }
  }

  unshift(chunk, encoding = null) {
    // TODO convert encoding
    if (this.readableEnded) throw new Error('Cannot unshift from ended stream');
    if (chunk === null) {
      // end the stream and close it
    }
    if (typeof chunk === 'string') {
      this._readableOut.writeChars(chunk);
    } else if (chunk instanceof Buffer || chunk instanceof Uint8Array) {
      this._readableOut.write(chunk.values());
    } else if (this.writableObjectMode) {
      this._readableOut.writeObject(chunk);
    }
    if (this._isPaused) {
      this._readableOut.flush();
    }
  }

  pause() {
    this._isPaused = true;
    this.emit('pause');
    return this;
  }

  isPaused() {
    return this._isPaused;
  }

  resume() {
    this._isPaused = false;
    this.emit('resume');
    return this;
  }

  destroy(error) {
    if (this.destroyed) return;
    try {
      this._destroy();
    } catch (err) {
      if (!(err instanceof ERR_METHOD_NOT_IMPLEMENTED)) throw err;
    }
    this.destroyed = true;
    this._readableOut.close();
    if (error) this.emit('error', error);
    this.emit('close');
    this.readableEnded = true;
  }

  _destroy() {
    throw new ERR_METHOD_NOT_IMPLEMENTED('Readable._destroy()');
  }

  read(size) {
    if (this.destroyed) throw new Error('Cannot read from destroyed stream');
    if (this.readableLength === 0) return null;
    try {
      return this._read(size);
    } catch (err) {
      if (!(err instanceof ERR_METHOD_NOT_IMPLEMENTED)) throw err;
    }
    return this._readableIn.readObject();
  }

  _read() {
    throw new ERR_METHOD_NOT_IMPLEMENTED('Readable._read()');
  }

  pipe(destination, { end = true }) {
    // create event emitter bindings with destination
    return destination;
  }
}

Readable.prototype[Symbol.asyncIterator] = () => {
  // I have no fucking clue
};

Object.defineProperty(Readable.prototype, 'readableLength', {
  get() {
    return this._readableInput.available();
  }
});

module.exports = Readable;
