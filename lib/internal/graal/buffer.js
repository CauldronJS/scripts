const { ENCODING_MAP } = require('internal/util/java');
const { Buffer } = require('java/nio/buffer');

class JsBuffer extends Buffer {
  constructor(size) {
    super(size);
    this._array = new Uint8Array(size);
  }

  array() {
    return this._array;
  }

  arrayOffset() {
    return 0;
  }

  hasArray() {
    return true;
  }

  isDirect() {
    return false;
  }

  isReadOnly() {
    return false;
  }

  get(start, end) {
    this._array.subarray(start, end);
  }

  put(chunk, index = 0) {
    // TODO index check
    if (Array.isArray(chunk)) {
      this._array.set(chunk, index);
    } else {
      this._array[chunk] = index;
    }
  }
}

function utf8Write(str, index, length) {
  const encoded = ENCODING_MAP.utf8.encode(str);
}

function utf8Slice(start, end) {}

function ucs2Write(str, index, length) {}

function ucs2Slice(start, end) {}

function asciiWrite(str, index, length) {}

function asciiSlice(start, end) {}

function latinWrite(str, index, length) {}

function latinSlice(start, end) {}

function hexWrite(str, index, length) {}

function hexSlice(start, end) {}

function base64Write(str, index, length) {}

function base64Slice(start, end) {}

function utf16leWrite(str, index, length) {}

function utf16leSlice(start, end) {}

function patchBufferPrototype(proto) {
  proto.utf8Write = utf8Write;
  proto.utf8Slice = utf8Slice;
  proto.ucs2Write = ucs2Write;
  proto.ucs2Slice = ucs2Slice;
  proto.asciiWrite = asciiWrite;
  proto.asciiSlice = asciiSlice;
  proto.latinWrite = latinWrite;
  proto.latinSlice = latinSlice;
  proto.hexWrite = hexWrite;
  proto.hexSlice = hexSlice;
  proto.base64Write = base64Write;
  proto.base64Slice = base64Slice;
  proto.utf16leWrite = utf16leWrite;
  proto.utf16leSlice = utf16leSlice;
}

module.exports = {
  install: patchBufferPrototype,
  JsBuffer
};
