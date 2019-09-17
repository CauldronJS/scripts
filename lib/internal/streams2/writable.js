const {
  PipedOutputStream,
  PipedInputStream,
  ObjectOutputStream,
  ObjectInputStream
} = require('java/io');
const { EventEmitter } = require('events');
const { ENCODING_MAP } = require('internal/util/java');
const { ERR_METHOD_NOT_IMPLEMENTED } = require('internal/errors').codes;
const Readable = require('internal/streams2/readable');

class Writable extends EventEmitter {
  constructor(options) {
    super();
    if (options) {
      if (typeof options.write === 'function') {
        this._write = options.write;
      }
      if (typeof options.writev === 'function') {
        this._writev = options.writev;
      }
      if (typeof options.destroy === 'function') {
        this._destroy = options.destroy;
      }
      if (typeof options.final === 'function') {
        this._final = options.final;
      }
    }

    this.destroyed = false;
    this.writable = true;
    this.writableEnded = false;
    this.writableFinished = false;
    this.writableObjectMode = options.objectMode;

    this.writableHighWaterMark = options.highWaterMark || 16 * 1024;
  }

  cork() {
    // TODO
  }

  destroy(error) {
    // TODO
  }

  end(chunk, encoding, cb) {
    // TODO
  }

  setDefaultEncoding(encoding) {
    this._defaultEncoding = encoding;
  }

  uncork() {
    // TODO
  }

  write(chunk, encoding, cb) {
    // TODO
  }
}

module.exports = Writable;
