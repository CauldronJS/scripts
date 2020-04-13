const { Transform } = require('stream');

class ZlibBase extends Transform {
  constructor() {
    super();
    this.bytesWritten = 0;
  }
  close(callback) {}
  flush(kind, callback) {}
  params(level, strategy, callback) {}
  reset() {}
}

const createOptionsFrom = (options, type) => {
  const result = Object.create(type.prototype || type);
  // eslint-disable-next-line prefer-const
  for (let field in result) {
    result[field] = options[field];
  }

  return result;
};

class Options {
  constructor() {
    this.flush = constants.Z_NO_FLUSH;
    this.finishFlush = constants.Z_FINISH;
    this.chunkSize = 16 * 1024;
    this.windowBits = -1;
    this.level = -1;
    this.memLevel = -1;
    this.strategy = -1;
    this.dictionary = Object.create(null);
    this.info = false;
  }
}

class BrotliOptions {
  constructor() {
    this.flush = constants.BROTLI_OPERATION_PROCESS;
    this.flushFinish = constants.BROTLI_OPERATION_FINISH;
    this.chunkSize = 16 * 1024;
    this.params = Object.create(null);
  }
}

class BrotliCompress extends ZlibBase {}

const createBrotliCompress = options => {};

class BrotliDecompress extends ZlibBase {}

const createBrotliDecompress = options => {};

class Deflate extends ZlibBase {}

const createDeflate = options => {};

class DeflateRaw extends ZlibBase {}

const createDeflateRaw = options => {};

class Gunzip extends ZlibBase {}

const createGunzip = options => {};

class Inflate extends ZlibBase {}

const createInflate = options => {};

class InflateRaw extends ZlibBase {}

const createInflateRaw = options => {};

class Unzip extends ZlibBase {}

const createUnzip = options => {};

const constants = {
  Z_NO_FLUSH: 0,
  Z_PARTIAL_FLUSH: 1,
  Z_SYNC_FLUSH: 2,
  Z_FULL_FLUSH: 3,
  Z_FINISH: 4,
  Z_BLOCK: 5,
  Z_TREES: 6,
  Z_OK: 0,
  Z_STREAM_END: 1,
  Z_NEED_DICT: 2,
  Z_ERRNO: -1,
  Z_STREAM_ERROR: -2,
  Z_DATA_ERROR: -3,
  Z_MEM_ERROR: -4,
  Z_BUF_ERROR: -5,
  Z_VERSION_ERROR: -6,
  Z_NO_COMPRESSION: 0,
  Z_BEST_SPEED: 1,
  Z_BEST_COMPRESSION: 9,
  Z_DEFAULT_COMPRESSION: -1,
  Z_FILTERED: 1,
  Z_HUFFMAN_ONLY: 2,
  Z_RLE: 3,
  Z_FIXED: 4,
  Z_DEFAULT_STRATEGY: 0,
  Z_BINARY: 0,
  Z_TEXT: 1,
  Z_ASCII: 1,
  Z_UNKNOWN: 2,
  Z_DEFLATED: 8,
  Z_NULL: 0,
  BROTLI_OPERATION_PROCESS: 0x30,
  BROTLI_OPERATION_FLUSH: 0x31,
  BROTLI_OPERATION_FINISH: 0x32,
  BROTLI_OPERATION_EMIT_METADATA: 0x33,
  BROTLI_MODE_GENERIC: 0x40,
  BROTLI_MODE_TEXT: 0x41,
  BROTLI_MODE_FONT: 0x42,
  BROTLI_PARAM_MODE: 0x25,
  BROTLI_PARAM_QUALITY: 0x20,
  BROTLI_MIN_QUALITY: 0,
  BROTLI_MAX_QUALITY: 1,
  BROTLI_PARAM_SIZE_HINT: 0x21,
  BROTLI_PARAM_LGWIN: 0x22,
  BROTLI_MIN_WINDOW_BITS: 0,
  BROTLI_MAX_WINDOW_BITS: 1,
  BROTLI_DEFAULT_WINDOW: 1,
  BROTLI_LARGE_MAX_WINDOW_BITS: 2,
  BROTLI_PARAM_LARGE_WINDOW: 0x23,
  BROTLI_PARAM_LGBLOCK: 0x24,
  BROTLI_PARAM_DISABLE_LITERAL_CONTEXT_MODELING: 0x26,
  BROTLI_PARAM_NPOSTFIX: 0x27,
  BROTLI_PARAM_NDIRECT: 0x28,
  BROTLI_DECODER_PARAM_DISABLE_RING_BUFFER_REALLOCATION: 0x50,
  BROTLI_DECODER_PARAM_LARGE_WINDOW: 0x51
};

module.exports = {
  BrotliCompress,
  createBrotliCompress,
  BrotliDecompress,
  createBrotliDecompress,
  Deflate,
  createDeflate,
  DeflateRaw,
  createDeflateRaw,
  Gunzip,
  createGunzip,
  Inflate,
  createInflate,
  InflateRaw,
  createInflateRaw,
  Unzip,
  createUnzip,
  constants,
  Options,
  BrotliOptions
};
