/* eslint-disable no-buffer-constructor */
// an attempt at using Java's buffers to replicate Node functionality
const ByteBuffer = require('@java/java.nio.ByteBuffer');
const Integer = require('@java/java.lang.Integer');
const Arrays = require('@java/java.util.Arrays');

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
  constructor(jb) {
    this.jBuffer = jb;
  }
  readDoubleBE(offset, noAssert) {
    if (noAssert !== true && this.jBuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    return this.jBuffer.getDouble(offset);
  }
  readDoubleLE(offset, noAssert) {
    if (noAssert !== true && this.jBuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    return Integer.reverseBytes(this.readDoubleBE(offset, noAssert));
  }
  readFloatBE(offset, noAssert) {
    if (noAssert !== true && this.jBuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    return this.jBuffer.getFloat(offset);
  }
  readFloatLE(offset, noAssert) {
    if (noAssert !== true && this.jBuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    return Integer.reverseBytes(this.readFloatBE(offset, noAssert));
  }
  readInt8(offset, noAssert) {
    if (noAssert !== true && this.jBuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    return convertByteToSigned(this.readUInt8(offset, noAssert));
  }
  readUInt8(offset, noAssert) {
    if (noAssert !== true && this.jBuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    return this.jBuffer.get(offset);
  }
  readInt16BE(offset, noAssert) {
    if (noAssert !== true && this.jBuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    return this.jBuffer.getShort(offset);
  }
  readInt16LE(offset, noAssert) {
    if (noAssert !== true && this.jBuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    return Integer.reverseBytes(this.readInt16BE(offset, noAssert));
  }
  readUInt16BE(offset, noAssert) {
    if (noAssert !== true && this.jBuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    return convertShortToUnsigned(this.jBuffer.getShort(offset));
  }
  readUInt16LE(offset, noAssert) {
    if (noAssert !== true && this.jBuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    return Integer.reverseBytes(this.readUInt16BE(offset, noAssert));
  }
  readInt32BE(offset, noAssert) {
    if (noAssert !== true && this.jBuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    return this.jBuffer.getInt(offset);
  }
  readInt32LE(offset, noAssert) {
    if (noAssert !== true && this.jBuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    return Integer.reverseBytes(this.readInt32BE(offset, noAssert));
  }
  readUInt32BE(offset, noAssert) {
    if (noAssert !== true && this.jBuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    return convertIntToUnsigned(this.jBuffer.getInt(offset));
  }
  readUInt32LE(offset, noAssert) {
    if (noAssert !== true && this.jBuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    return Integer.reverseBytes(this.readUInt32BE(offset, noAssert));
  }
  writeDoubleBE(value, offset, noAssert) {
    if (noAssert !== true && this.jBuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    this.jBuffer.putDouble(value, offset);
    return 8;
  }
  writeDoubleLE(value, offset, noAssert) {
    if (noAssert !== true && this.jBuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    this.jBuffer.putDouble(Integer.reverseBytes(value), offset);
    return 8;
  }
  writeFloatBE(value, offset, noAssert) {
    if (noAssert !== true && this.jBuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    this.jBuffer.putFloat(value, offset);
    return 4;
  }
  writeFloatLE(value, offset, noAssert) {
    if (noAssert !== true && this.jBuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    this.jBuffer.putFloat(Integer.reverseBytes(value), offset);
    return 4;
  }
  writeInt8(value, offset, noAssert) {
    if (noAssert !== true && this.jBuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    this.jBuffer.put(Integer.reverseBytes(value), offset);
    return 1;
  }
  writeUInt8(value, offset, noAssert) {
    if (noAssert !== true && this.jBuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    this.jBuffer.put(value, offset);
    return 1;
  }
  writeInt16BE(value, offset, noAssert) {
    if (noAssert !== true && this.jBuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    this.jBuffer.putShort(value, offset);
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
    if (noAssert !== true && this.jBuffer.limit() <= offset) {
      throw new Error("The offset must be less than the buffer's length.");
    }
    this.jBuffer.putInt(value, offset);
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
  write(
    value,
    offset = 0,
    length = this.jBuffer.limit() - offset,
    encoding = 'UTF8'
  ) {
    const remaining = this.jBuffer.remaining();
    const bytes = value.getBytes(encoding);
    this.jBuffer.put(bytes, offset, length);
    return Math.min([remaining, bytes.length]);
  }
  slice(start, end) {
    // this is really hackish, but I don't know a faster/native way.
    const source = this.jb.array();
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
    if (this.jb.capacity() % 2 > 0) {
      throw new errors.ERR_INVALID_BUFFER_SIZE();
    }
  }
  swap32() {
    if (!errors) {
      requireErrors();
    }
    if (this.jb.capacity() % 4 > 0) {
      throw new errors.ERR_INVALID_BUFFER_SIZE();
    }
  }
  swap64() {
    if (!errors) {
      requireErrors();
    }
    if (this.jb.capacity() % 8 > 0) {
      throw new errors.ERR_INVALID_BUFFER_SIZE();
    }
  }
  toJSON() {}
  toString(encoding, start, end) {}
  values() {}
  static alloc(size, fill, encoding) {
    const buffer = new Buffer(ByteBuffer.allocate(size));
    if (fill) {
      for (let i = 0; i < size; i++) {
        buffer.write(fill[i]);
      }
    }
    return buffer;
  }
  static transcode(source, fromEnc, toEnc) {}
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

exports.Buffer = Buffer;
