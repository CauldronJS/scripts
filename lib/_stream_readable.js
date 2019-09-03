/**
 * Represents a readable stream in Cauldron
 *
 * @file    \lib\_stream_readable.js
 * @author  Justin Cox <https://conji.me>
 */

const { EventEmitter } = require('events');
const Stream = require('stream');
const { getHighWaterMark } = require('internal/streams/state');
const {
  ERR_INVALID_ARG_TYPE,
  ERR_STREAM_PUSH_AFTER_EOF,
  ERR_METHOD_NOT_IMPLEMENTED,
  ERR_STREAM_UNSHIFT_AFTER_END_EVENT
} = require('internal/errors').codes;

class ReadableState {
  constructor(options, stream, isDuplex) {
    options = options || {};
    if (typeof isDuplex !== 'boolean') {
      isDuplex = stream instanceof Stream.Duplex;
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
  }
}

class Readable extends EventEmitter {
  constructor(options) {
    super();

    const isDuplex = this instanceof Stream.Duplex;
  }
}

module.exports = Readable;
