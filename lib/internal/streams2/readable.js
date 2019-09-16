const { PipedOutputStream, PipedInputStream } = require('java/io');
const { EventEmitter } = require('events');
const JString = require('java/lang/String');
const { ENCODING_MAP } = require('internal/util/java');
const { ERR_METHOD_NOT_IMPLEMENTED } = require('internal/errors').codes;

class Readable extends EventEmitter {
  /**
   *
   * @param {{objectMode: boolean, inputStream?, outputStream?, encoding: string}} options
   */
  constructor(options) {
    super();
    this._readableIn = options.inputStream || new PipedInputStream();
    this._readableOut =
      options.outputStream || new PipedOutputStream(this._readableIn);

    this.writableObjectMode = !!options.objectMode;
    this._isPaused = false;
    this._encoding = ENCODING_MAP[options.encoding || 'utf8'];

    this.destroyed = false;
    this.readable = true;
    this.readableEncoding = this._encoding;
    this.readableEnded = false;
    this.readableHighWaterMark = 16 * 1024;
  }

  push(v) {
    if (v === null) {
      // end the stream and close it
    }
    // I have no clue what cases this won't work with
    this._readableOut.write(JString.valueOf(v).getBytes());
    if (this._isCorked) {
      this._readableOut.flush();
    }
  }

  pause() {
    this._isPaused = true;
  }

  isPaused() {
    return this._isPaused;
  }

  resume() {
    this._isPaused = false;
  }

  destroy(error) {
    if (this.destroyed) return;
    if (error) this.emit('error', error);
    this.emit('close');
  }

  _destroy() {
    throw new ERR_METHOD_NOT_IMPLEMENTED('Readable._destroy()');
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
