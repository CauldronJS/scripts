var EventEmitter = require('events');
var StreamBase = require('internal/stream/_stream_base');
var util = require('util');
var errors = require('errors').codes;

function WritableStream(options, stream, isDuplex) {
    options = options || {};
    EventEmitter.call(this);
    this.writableHighWaterMark = null;
    this.writableLength = 0;
    this._encoding = 'latin1';
    this._isCorked = false;
}

util.inherits(WritableStream, StreamBase);

WritableStream.prototype.cork = function() {
    this._isCorked = true;
}

WritableStream.prototype.destroy = function(error) {

}

WritableStream.prototype.end = function(chunk, encoding, callback) {

}

WritableStream.prototype.setDefaultEncoding = function(encoding) {
    this._encoding = encoding;
}

WritableStream.prototype.uncork = function() {
    this._isCorked = false;
}

WritableStream.prototype.write = function(chunk, encoding, callback) {

}

module.exports = WritableStream;