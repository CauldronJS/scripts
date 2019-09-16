/* eslint-disable global-require */
/* eslint-disable no-buffer-constructor */
// an attempt at using Java's buffers to replicate Node functionality
const ByteBuffer = require('java/nio/ByteBuffer');
const Integer = require('java/lang/Integer');
const Arrays = require('java/util/Arrays');
const { ENCODING_MAP } = require('internal/util/java');

let errors;

const requireErrors = () => (errors = require('internal/errors').codes);

function convertByteToSigned(b) {
  if (b < 128) {
    return b;
  }
  return Math.pow(2, 8) + Math.abs(b);
}

function convertShortToUnsigned(s) {
  if (s > 0) {
    return s;
  }
  return Math.pow(2, 16) + Math.abs(s);
}

function convertIntToUnsigned(i) {
  if (i > 0) {
    return i;
  }
  return Math.pow(2, 32) + Math.abs(i);
}

class Buffer {
  constructor(jBuffer, encoding) {
    this.jBufferuffer = jBuffer;
    if (ENCODING_MAP[encoding]) {
      this._encoding = ENCODING_MAP[encoding];
    } else {
      this._encoding = encoding;
    }
  }
  readDoubleBE(offset, noAssert) {
    if (noAssert !== true && this.jBufferuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    return this.jBufferuffer.getDouble(offset);
  }
  readDoubleLE(offset, noAssert) {
    if (noAssert !== true && this.jBufferuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    return Integer.reverseBytes(this.readDoubleBE(offset, noAssert));
  }
  readFloatBE(offset, noAssert) {
    if (noAssert !== true && this.jBufferuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    return this.jBufferuffer.getFloat(offset);
  }
  readFloatLE(offset, noAssert) {
    if (noAssert !== true && this.jBufferuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    return Integer.reverseBytes(this.readFloatBE(offset, noAssert));
  }
  readInt8(offset, noAssert) {
    if (noAssert !== true && this.jBufferuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    return convertByteToSigned(this.readUInt8(offset, noAssert));
  }
  readUInt8(offset, noAssert) {
    if (noAssert !== true && this.jBufferuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    return this.jBufferuffer.get(offset);
  }
  readInt16BE(offset, noAssert) {
    if (noAssert !== true && this.jBufferuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    return this.jBufferuffer.getShort(offset);
  }
  readInt16LE(offset, noAssert) {
    if (noAssert !== true && this.jBufferuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    return Integer.reverseBytes(this.readInt16BE(offset, noAssert));
  }
  readUInt16BE(offset, noAssert) {
    if (noAssert !== true && this.jBufferuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    return convertShortToUnsigned(this.jBufferuffer.getShort(offset));
  }
  readUInt16LE(offset, noAssert) {
    if (noAssert !== true && this.jBufferuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    return Integer.reverseBytes(this.readUInt16BE(offset, noAssert));
  }
  readInt32BE(offset, noAssert) {
    if (noAssert !== true && this.jBufferuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    return this.jBufferuffer.getInt(offset);
  }
  readInt32LE(offset, noAssert) {
    if (noAssert !== true && this.jBufferuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    return Integer.reverseBytes(this.readInt32BE(offset, noAssert));
  }
  readUInt32BE(offset, noAssert) {
    if (noAssert !== true && this.jBufferuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    return convertIntToUnsigned(this.jBufferuffer.getInt(offset));
  }
  readUInt32LE(offset, noAssert) {
    if (noAssert !== true && this.jBufferuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    return Integer.reverseBytes(this.readUInt32BE(offset, noAssert));
  }
  writeDoubleBE(value, offset, noAssert) {
    if (noAssert !== true && this.jBufferuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    this.jBufferuffer.putDouble(value, offset);
    return 8;
  }
  writeDoubleLE(value, offset, noAssert) {
    if (noAssert !== true && this.jBufferuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    this.jBufferuffer.putDouble(Integer.reverseBytes(value), offset);
    return 8;
  }
  writeFloatBE(value, offset, noAssert) {
    if (noAssert !== true && this.jBufferuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    this.jBufferuffer.putFloat(value, offset);
    return 4;
  }
  writeFloatLE(value, offset, noAssert) {
    if (noAssert !== true && this.jBufferuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    this.jBufferuffer.putFloat(Integer.reverseBytes(value), offset);
    return 4;
  }
  writeInt8(value, offset, noAssert) {
    if (noAssert !== true && this.jBufferuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    this.jBufferuffer.put(Integer.reverseBytes(value), offset);
    return 1;
  }
  writeUInt8(value, offset, noAssert) {
    if (noAssert !== true && this.jBufferuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    this.jBufferuffer.put(value, offset);
    return 1;
  }
  writeInt16BE(value, offset, noAssert) {
    if (noAssert !== true && this.jBufferuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    this.jBufferuffer.putShort(value, offset);
    return 2;
  }
  writeInt16LE(value, offset, noAssert) {
    return this.writeInt16BE(Integer.reverseBytes(value), offset, noAssert);
  }
  writeUInt16BE(value, offset, noAssert) {
    return this.writeInt16BE(convertShortToUnsigned(value), offset, noAssert);
  }
  writeUInt16LE(value, offset, noAssert) {
    return this.writeInt16LE(convertShortToUnsigned(value), offset, noAssert);
  }
  writeInt32BE(value, offset, noAssert) {
    if (noAssert !== true && this.jBufferuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    this.jBufferuffer.putInt(value, offset);
    return 4;
  }
  writeInt32LE(value, offset, noAssert) {
    return this.writeInt32BE(Integer.reverseBytes(value), offset, noAssert);
  }
  writeUInt32BE(value, offset, noAssert) {
    return this.writeInt32BE(convertIntToUnsigned(value), offset, noAssert);
  }
  writeUInt32LE(value, offset, noAssert) {
    return this.writeInt32LE(convertIntToUnsigned(value), offset, noAssert);
  }
  // eslint-disable-next-line max-params
  write(
    value,
    offset = 0,
    length = this.jBufferuffer.limit() - offset,
    encoding = 'UTF8'
  ) {
    const remaining = this.jBufferuffer.remaining();
    const bytes = value.getBytes(encoding);
    this.jBufferuffer.put(bytes, offset, length);
    return Math.min([remaining, bytes.length]);
  }
  slice(start, end) {
    // this is really hackish, but I don't know a faster/native way.
    const source = this.jBuffer.array();
    const result = Arrays.copyOfRange(
      source,
      start || 0,
      end || source.capacity()
    );
    return Buffer.from(result);
  }
  swap16() {
    if (!errors) {
      requireErrors();
    }
    if (this.jBuffer.capacity() % 2 > 0) {
      throw new errors.ERR_INVALID_BUFFER_SIZE();
    }
  }
  swap32() {
    if (!errors) {
      requireErrors();
    }
    if (this.jBuffer.capacity() % 4 > 0) {
      throw new errors.ERR_INVALID_BUFFER_SIZE();
    }
  }
  swap64() {
    if (!errors) {
      requireErrors();
    }
    if (this.jBuffer.capacity() % 8 > 0) {
      throw new errors.ERR_INVALID_BUFFER_SIZE();
    }
  }
  toJSON() {}
  toString(encoding, start, end) {
    const subBuffer = this.jBuffer
      .slice()
      .position(start)
      .limit(end)
      .array();
    return new java.lang.String(
      subBuffer,
      encoding || this.encoding
    ).toString();
  }
  values() {}
  static alloc(size, fill, encoding) {
    const buffer = new Buffer(ByteBuffer.allocate(size), encoding);
    if (fill) {
      for (let i = 0; i < size; i++) {
        buffer.write(fill[i]);
      }
    }
    return buffer;
  }
  static transcode(source, fromEnc, toEnc) {
    this._encoding = toEnc;
  }
  static from(contents) {
    return new Buffer(ByteBuffer.wrap(contents));
  }
}

Buffer.INSPECT_MAX_BYTES = 50;
Buffer.constants = {
  MAX_LENGTH: Integer.MAX_VALUE,
  MAX_STRING_LENGTH: Integer.MAX_VALUE
};

Buffer.kMaxLength = Buffer.constants.MAX_LENGTH;
Buffer.FastBuffer = class {
  constructor(buffer, offset, length) {
    this.buffer = buffer;
    this.offset = offset;
    this.length = length;
  }
};

exports.Buffer = Buffer;
