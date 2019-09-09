/**
 * Represents an incoming HTTP message
 *
 * @file    \lib\_http_incoming.js
 * @author  Justin Cox <https://conji.me>
 */

const { Readable } = require('stream');

class IncomingMessage extends Readable {
  constructor(socket) {
    super();

    this._readableState.readingMore = true;

    this.socket = socket;
    this.connection = socket;

    this.httpVersionMajor = null;
    this.httpVersionMinor = null;
    this.httpVersion = null;
    this.complete = false;
    this.headers = Object.create(null);
    this.rawHeaders = [];
    this.trailers = Object.create(null);
    this.rawTrailers = [];

    this.readable = true;
    this.aborted = false;
    this.upgrade = null;

    this.url = '';
    this.method = null;

    this.statusCode = null;
    this.statusMessage = null;
    this.client = socket;

    this._consuming = false;
    this._dumped = false;
  }

  setTimeout(msecs, callback) {
    if (callback) this.on('timeout', callback);
    this.socket.setTimeout(msecs);
    return this;
  }

  _read(n) {
    if (!this._consuming) {
      this._readableState.readingMore = false;
      this._consuming = true;
    }

    if (this.socket.readable) {
      // read from the base stream
    }
  }

  destroy(error) {
    if (this.socket) {
      this.socket.destroy(error);
    }
  }
}

// This function is used to help avoid the lowercasing of a field name if it
// matches a 'traditional cased' version of a field name. It then returns the
// lowercased name to both avoid calling toLowerCase() a second time and to
// indicate whether the field was a 'no duplicates' field. If a field is not a
// 'no duplicates' field, a `0` byte is prepended as a flag. The one exception
// to this is the Set-Cookie header which is indicated by a `1` byte flag, since
// it is an 'array' field and thus is treated differently in _addHeaderLines().
// TODO: perhaps http_parser could be returning both raw and lowercased versions
// of known header names to avoid us having to call toLowerCase() for those
// headers.

// 'array' header list is taken from:
// https://mxr.mozilla.org/mozilla/source/netwerk/protocol/http/src/nsHttpHeaderArray.cpp
function matchKnownFields(field) {
  let low = false;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    switch (field) {
      case 'Content-Type':
      case 'content-type':
        return 'content-type';
      case 'Content-Length':
      case 'content-length':
        return 'content-length';
      case 'User-Agent':
      case 'user-agent':
        return 'user-agent';
      case 'Referer':
      case 'referer':
        return 'referer';
      case 'Host':
      case 'host':
        return 'host';
      case 'Authorization':
      case 'authorization':
        return 'authorization';
      case 'Proxy-Authorization':
      case 'proxy-authorization':
        return 'proxy-authorization';
      case 'If-Modified-Since':
      case 'if-modified-since':
        return 'if-modified-since';
      case 'If-Unmodified-Since':
      case 'if-unmodified-since':
        return 'if-unmodified-since';
      case 'From':
      case 'from':
        return 'from';
      case 'Location':
      case 'location':
        return 'location';
      case 'Max-Forwards':
      case 'max-forwards':
        return 'max-forwards';
      case 'Retry-After':
      case 'retry-after':
        return 'retry-after';
      case 'ETag':
      case 'etag':
        return 'etag';
      case 'Last-Modified':
      case 'last-modified':
        return 'last-modified';
      case 'Server':
      case 'server':
        return 'server';
      case 'Age':
      case 'age':
        return 'age';
      case 'Expires':
      case 'expires':
        return 'expires';
      case 'Set-Cookie':
      case 'set-cookie':
        return '\u0001';
      case 'Cookie':
      case 'cookie':
        return '\u0002cookie';
      // The fields below are not used in _addHeaderLine(), but they are common
      // headers where we can avoid toLowerCase() if the mixed or lower case
      // versions match the first time through.
      case 'Transfer-Encoding':
      case 'transfer-encoding':
        return '\u0000transfer-encoding';
      case 'Date':
      case 'date':
        return '\u0000date';
      case 'Connection':
      case 'connection':
        return '\u0000connection';
      case 'Cache-Control':
      case 'cache-control':
        return '\u0000cache-control';
      case 'Vary':
      case 'vary':
        return '\u0000vary';
      case 'Content-Encoding':
      case 'content-encoding':
        return '\u0000content-encoding';
      case 'Origin':
      case 'origin':
        return '\u0000origin';
      case 'Upgrade':
      case 'upgrade':
        return '\u0000upgrade';
      case 'Expect':
      case 'expect':
        return '\u0000expect';
      case 'If-Match':
      case 'if-match':
        return '\u0000if-match';
      case 'If-None-Match':
      case 'if-none-match':
        return '\u0000if-none-match';
      case 'Accept':
      case 'accept':
        return '\u0000accept';
      case 'Accept-Encoding':
      case 'accept-encoding':
        return '\u0000accept-encoding';
      case 'Accept-Language':
      case 'accept-language':
        return '\u0000accept-language';
      case 'X-Forwarded-For':
      case 'x-forwarded-for':
        return '\u0000x-forwarded-for';
      case 'X-Forwarded-Host':
      case 'x-forwarded-host':
        return '\u0000x-forwarded-host';
      case 'X-Forwarded-Proto':
      case 'x-forwarded-proto':
        return '\u0000x-forwarded-proto';
      default:
        if (low) return '\u0000' + field;
        field = field.toLowerCase();
        low = true;
    }
  }
}

module.exports = {
  IncomingMessage
};
