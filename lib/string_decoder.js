// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

const { Buffer } = require('buffer');
const {
  ERR_INVALID_ARG_TYPE,
  ERR_UNKNOWN_ENCODING
} = require('internal/errors').codes;
const { ENCODING_MAP } = require('internal/util/java');

class StringDecoder {
  constructor(encoding) {
    const matchedEncoding = ENCODING_MAP[encoding];
    if (!matchedEncoding) throw new ERR_UNKNOWN_ENCODING(encoding);
    this._encoding = matchedEncoding;
  }

  /**
   * Returns any remaining input stored in the internal buffer as a string.
   *
   * @param {Buffer} buffer
   */
  end(buffer) {
    // TODO
    if (!(buffer instanceof Buffer)) throw new ERR_INVALID_ARG_TYPE(buffer);
  }

  /**
   * Returns a decoded string, ensuring that any incomplete multibyte characters are omitted.
   *
   * @param {Buffer} buffer
   */
  write(buffer) {
    // TODO
    if (!(buffer instanceof Buffer)) throw new ERR_INVALID_ARG_TYPE(buffer);
  }
}

exports.StringDecoder = StringDecoder;
