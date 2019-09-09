/**
 * Represents a readable stream in Cauldron
 *
 * @file    \lib\_stream_readable.js
 * @author  Justin Cox <https://conji.me>
 */

const { PipedReader, BufferedReader } = require('@java/java.io');
const { EventEmitter } = require('events');
const { Duplex } = require('stream');
const { getHighWaterMark } = require('internal/streams/state');
const destroyImpl = require('internal/streams/destroy');
const {
  ERR_INVALID_ARG_TYPE,
  ERR_STREAM_PUSH_AFTER_EOF,
  ERR_METHOD_NOT_IMPLEMENTED,
  ERR_STREAM_UNSHIFT_AFTER_END_EVENT
} = require('internal/errors').codes;
const createReadableAsyncIterator = require('internal/streams/async_iterator');
const { emitExperimentalFeature } = require('internal/util');

let StringDecoder;

class ReadableState {
  constructor(options, stream, isDuplex) {
    options = options || {};
    if (typeof isDuplex !== 'boolean') {
      isDuplex = stream instanceof Duplex;
    }

    this.objectMode = !!options.objectMode;

    if (isDuplex) {
      this.objectMode = this.objectMode || !!options.readableObjectMode;
    }
    this.highWaterMark = getHighWaterMark(
      this,
      options,
      'readableHighWaterMark',
      isDuplex
    );

    this.decoder = null;
    this.encoding = null;
    if (options.encoding) {
      if (!StringDecoder)
        // eslint-disable-next-line global-require
        StringDecoder = require('string_decoder').StringDecoder;
      this.decoder = new StringDecoder(options.encoding);
      this.encoding = options.encoding;
    }

    this.buffer = null; // TODO: set to Java object
    this.flowing = true;
    this.length = 0;

    this.autoDestroy = !!options.autoDestroy;
  }

  getBuffer() {
    return this.buffer;
  }
}

class Readable extends EventEmitter {
  constructor(options) {
    super();

    const isDuplex = this instanceof Duplex;
    this._readableState = new ReadableState(options, this, isDuplex);
    this.readable = true;

    if (options) {
      if (typeof options.read === 'function') this._read = options.read;
      if (typeof options.destroy === 'function')
        this._destroy = options.destroy;
    }

    this.destroy = destroyImpl.destroy;
    this._undestroy = destroyImpl.undestroy;
    this._destroy = (err, cb) => cb(err);

    this.destroyed = false;
    this.readable = true;
    this.readableEncoding = this._readableState.encoding;
    this.readableEnded = false;
    this.readableObjectMode = this._readableState.objectMode;
  }

  destroy(error) {
    this.on('destroy', error);
    this._readableState.buffer.close();
  }

  push(chunk, encoding) {
    // TODO:
  }

  unshift(chunk) {
    // TODO
  }

  isPaused() {
    return this._readableState.flowing === false;
  }

  pause() {
    if (this._readableState) {
      this._readableState.flowing = false;
      this.emit('pause'); // TODO: event args?
    }
  }

  setEncoding(enc) {
    // TODO: set encoding of base buffer
  }

  read(n) {
    try {
      return this._read(n);
    } catch (err) {
      if (err instanceof ERR_METHOD_NOT_IMPLEMENTED) {
        // TODO: for now, just return a string. Worry about buffers later
        let result = '';
        let i = 0;
        while (i < n && this._readableState.buffer.ready()) {
          // TODO: this is an insanely inefficient and dumb way to do it. Idc right now.
          result += String.fromCharCode(this._readableState.buffer.read());
          i++;
        }
        return result;
      } else {
        throw err;
      }
    }
  }

  _read(n) {
    throw new ERR_METHOD_NOT_IMPLEMENTED('_read(n)');
  }

  pipe(dest, pipeOpts) {
    // TODO: pipe to another stream. Should we use Java's PipedReader/PipedWriter
  }
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  enumerable: false,
  get() {
    return this._readableState === undefined
      ? false
      : this._readableState.destroyed;
  },
  set(value) {
    if (!this._readableState) {
      return;
    }

    this._readableState.destroyed = value;
  }
});

Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
  enumerable: false,
  get() {
    return this._readableState.highWaterMark;
  }
});

Object.defineProperty(Readable.prototype, 'readableBuffer', {
  enumerable: false,
  get() {
    return this._readableState.getBuffer();
  }
});

Object.defineProperty(Readable.prototype, 'readableFlowing', {
  enumerable: false,
  get() {
    return this._readableState.flowing;
  },
  set(state) {
    if (this._readableState) {
      this._readableState.flowing = state;
    }
  }
});

Object.defineProperty(Readable.prototype, 'readableLength', {
  enumerable: false,
  get() {
    return this._readableState.length;
  }
});

Readable.prototype[Symbol.asyncIterator] = () => {
  emitExperimentalFeature('Readable[Symbol.asyncIterator]');
  return createReadableAsyncIterator(this);
};

module.exports = Readable;
