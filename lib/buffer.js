// an attempt at using Java's buffers to replicate Node functionality
const ByteBuffer = require('@java/java.nio.ByteBuffer');
const Integer = require('@java/java.lang.Integer');
const errors = require('internal/errors').codes;

function convertByteToSigned(b) {
  if (b < 128) return b;
  return Math.pow(2, 8) + Math.abs(b);
}

function convertShortToUnsigned(s) {
  if (s > 0) return s;
  return Math.pow(2, 16) + Math.abs(s);
}

function convertIntToUnsigned(i) {
  if (i > 0) return i;
  return Math.pow(2, 32) + Math.abs(i);
}

function Buffer(jb) {
  this.jBuffer = jb;
}

Buffer.prototype.readDoubleBE = function (offset, noAssert) {
  if (noAssert !== true && this.jBuffer.limit() <= offset)
    throw new Error("The offset must be less than the buffer's length.");
  return this.jBuffer.getDouble(offset);
};

Buffer.prototype.readDoubleLE = function (offset, noAssert) {
  if (noAssert !== true && this.jBuffer.limit() <= offset)
    throw new Error("The offset must be less than the buffer's length.");
  return Integer.reverseBytes(this.readDoubleBE(offset, noAssert));
};

Buffer.prototype.readFloatBE = function (offset, noAssert) {
  if (noAssert !== true && this.jBuffer.limit() <= offset)
    throw new Error("The offset must be less than the buffer's length.");
  return this.jBuffer.getFloat(offset);
};

Buffer.prototype.readFloatLE = function (offset, noAssert) {
  if (noAssert !== true && this.jBuffer.limit() <= offset)
    throw new Error("The offset must be less than the buffer's length.");
  return Integer.reverseBytes(this.readFloatBE(offset, noAssert));
};

Buffer.prototype.readInt8 = function (offset, noAssert) {
  if (noAssert !== true && this.jBuffer.limit() <= offset)
    throw new Error("The offset must be less than the buffer's length.");
  return convertByteToSigned(this.readUInt8(offset, noAssert));
};

Buffer.prototype.readUInt8 = function (offset, noAssert) {
  if (noAssert !== true && this.jBuffer.limit() <= offset)
    throw new Error("The offset must be less than the buffer's length.");
  return this.jBuffer.get(offset);
};

Buffer.prototype.readInt16BE = function (offset, noAssert) {
  if (noAssert !== true && this.jBuffer.limit() <= offset)
    throw new Error("The offset must be less than the buffer's length.");
  return this.jBuffer.getShort(offset);
};

Buffer.prototype.readInt16LE = function (offset, noAssert) {
  if (noAssert !== true && this.jBuffer.limit() <= offset)
    throw new Error("The offset must be less than the buffer's length.");
  return Integer.reverseBytes(this.readInt16BE(offset, noAssert));
};

Buffer.prototype.readUInt16BE = function (offset, noAssert) {
  if (noAssert !== true && this.jBuffer.limit() <= offset)
    throw new Error("The offset must be less than the buffer's length.");
  return convertShortToUnsigned(this.jBuffer.getShort(offset));
};

Buffer.prototype.readUInt16LE = function (offset, noAssert) {
  if (noAssert !== true && this.jBuffer.limit() <= offset)
    throw new Error("The offset must be less than the buffer's length.");
  return Integer.reverseBytes(this.readUInt16BE(offset, noAssert));
};

Buffer.prototype.readInt32BE = function (offset, noAssert) {
  if (noAssert !== true && this.jBuffer.limit() <= offset)
    throw new Error("The offset must be less than the buffer's length.");
  return this.jBuffer.getInt(offset);
};

Buffer.prototype.readInt32LE = function (offset, noAssert) {
  if (noAssert !== true && this.jBuffer.limit() <= offset)
    throw new Error("The offset must be less than the buffer's length.");
  return Integer.reverseBytes(this.readInt32BE(offset, noAssert));
};

Buffer.prototype.readUInt32BE = function (offset, noAssert) {
  if (noAssert !== true && this.jBuffer.limit() <= offset)
    throw new Error("The offset must be less than the buffer's length.");
  return convertIntToUnsigned(this.jBuffer.getInt(offset));
};

Buffer.prototype.readUInt32LE = function (offset, noAssert) {
  if (noAssert !== true && this.jBuffer.limit() <= offset)
    throw new Error("The offset must be less than the buffer's length.");
  return Integer.reverseBytes(this.readUInt32BE(offset, noAssert));
};

Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
  if (noAssert !== true && this.jBuffer.limit() <= offset)
    throw new Error("The offset must be less than the buffer's length.");
  this.jBuffer.putDouble(value, offset);
  return 8;
};

Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
  if (noAssert !== true && this.jBuffer.limit() <= offset)
    throw new Error("The offset must be less than the buffer's length.");
  this.jBuffer.putDouble(Integer.reverseBytes(value), offset);
  return 8;
};

Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
  if (noAssert !== true && this.jBuffer.limit() <= offset)
    throw new Error("The offset must be less than the buffer's length.");
  this.jBuffer.putFloat(value, offset);
  return 4;
};

Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
  if (noAssert !== true && this.jBuffer.limit() <= offset)
    throw new Error("The offset must be less than the buffer's length.");
  this.jBuffer.putFloat(Integer.reverseBytes(value), offset);
  return 4;
};

Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
  if (noAssert !== true && this.jBuffer.limit() <= offset)
    throw new Error("The offset must be less than the buffer's length.");
  this.jBuffer.put(Integer.reverseBytes(value), offset);
  return 1;
};

Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
  if (noAssert !== true && this.jBuffer.limit() <= offset)
    throw new Error("The offset must be less than the buffer's length.");
  this.jBuffer.put(value, offset);
  return 1;
};

Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
  if (noAssert !== true && this.jBuffer.limit() <= offset)
    throw new Error("The offset must be less than the buffer's length.");
  this.jBuffer.putShort(value, offset);
  return 2;
};

Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
  return this.writeInt16BE(Integer.reverseBytes(value), offset, noAssert);
};

Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
  return this.writeInt16BE(convertShortToUnsigned(value), offset, noAssert);
};

Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
  return this.writeInt16LE(convertShortToUnsigned(value), offset, noAssert);
};

Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
  if (noAssert !== true && this.jBuffer.limit() <= offset)
    throw new Error("The offset must be less than the buffer's length.");
  this.jBuffer.putInt(value, offset);
  return 4;
};

Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
  return this.writeInt32BE(Integer.reverseBytes(value), offset, noAssert);
};

Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
  return this.writeInt32BE(convertIntToUnsigned(value), offset, noAssert);
};

Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
  return this.writeInt32LE(convertIntToUnsigned(value), offset, noAssert);
};

Buffer.prototype.write = function (value, offset, length, encoding) {
  if (offset === undefined) offset = 0;
  if (length === undefined) length = this.jBuffer.limit() - offset;
  if (encoding === undefined) encoding = 'UTF8';
  var remaining = this.jBuffer.remaining();
  var bytes = value.getBytes(encoding);
  this.jBuffer.put(bytes, offset, length);
  return Math.min([remaining, bytes.length]);
};

Buffer.prototype.slice = function (start, end) {
  // this is really hackish, but I don't know a faster/native way.
  var source = this.jb.array();
  var result = java.util.Arrays.copyOfRange(
    source,
    start || 0,
    end || source.capacity()
  );
  return Buffer.from(result);
};

Buffer.prototype.swap16 = function () {
  if (this.jb.capacity() % 2 > 0) throw new errors.ERR_INVALID_BUFFER_SIZE();
};

Buffer.prototype.swap32 = function () {
  if (this.jb.capacity() % 4 > 0) throw new errors.ERR_INVALID_BUFFER_SIZE();
};

Buffer.prototype.swap64 = function () {
  if (this.jb.capacity() % 8 > 0) throw new errors.ERR_INVALID_BUFFER_SIZE();
};

Buffer.prototype.toJSON = function () { };

Buffer.prototype.toString = function (encoding, start, end) { };

Buffer.prototype.values = function () { };

Buffer.alloc = function (size, fill, encoding) {
  var buffer = new Buffer(ByteBuffer.alloc(size));
  if (fill != undefined) {
    for (var i = 0; i < size; i++) {
      buffer.write(fill[i]);
    }
  }

  return buffer;
};

Buffer.INSPECT_MAX_BYTES = 50;
Buffer.constants = {
  MAX_LENGTH: java.lang.Integer.MAX_VALUE,
  MAX_STRING_LENGTH: java.lang.Integer.MAX_VALUE
};

Buffer.transcode = function (source, fromEnc, toEnc) { };

Buffer.from = function (contents) {
  return new Buffer(ByteBuffer.wrap(contents));
};

module.exports = Buffer;
module.exports.kMaxLength = Buffer.constants.MAX_LENGTH;
