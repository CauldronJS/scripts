/**
 * FILE DESCRIPTION
 *
 * @file    \lib\_stream_writable.js
 * @author  Justin Cox <https://conji.me>
 */

const { PipedOutputStream, DataOutputStream } = require('@java/java.io');
const Stream = require('stream');
const { Buffer } = require('buffer');
const destroyImpl = require('internal/streams/destroy');
const { getHighWaterMark } = require('internal/streams/state');
const { ERR_METHOD_NOT_IMPLEMENTED } = require('internal/errors').codes;

const { errorOnDestroy } = destroyImpl;

// As of yet, Writable can't be piped but I'm importing anyways

class WritableState {
  constructor(options, stream, isDuplex) {
    options = options || {};
    if (typeof isDuplex !== 'boolean') {
      isDuplex = stream instanceof Stream.Duplex;
    }
    this.objectMode = !!options.objectMode;

    if (isDuplex) {
      this.objectMode = this.objectMode || !!options.writableObjectMode;
    }

    this.highWaterMark = getHighWaterMark(
      this,
      options,
      'writableHighWaterMark',
      isDuplex
    );

    this._buffer = null; // TODO: set to Java object
  }

  getBuffer() {
    return this._buffer;
  }
}

class Writable extends Stream {
  constructor(options) {
    super();
    const isDuplex = this instanceof Stream.Duplex;
    this._writableState = new WritableState(options, this, isDuplex);

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
    this.writableLength = 0;
    this.writableObjectMode = null;

    this._defaultEncoding = null;
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

// The following are made non-enumerable so userland manipulation doesn't fail

Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
  enumerable: false,
  get() {
    return this._writableState.highWaterMark;
  }
});

Object.defineProperty(Writable.prototype, 'writableBuffer', {
  enumerable: false,
  get() {
    return this._writableState.getBuffer();
  }
});

module.exports = Writable;
