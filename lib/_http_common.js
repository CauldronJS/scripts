/**
 * All constants to be used within HTTP
 *
 * @file    \lib\_http_common.js
 * @author  Justin Cox <https://spyce.codes>
 */

const { HTTPParser, methods } = process.binding('http_parser');
const { FreeList } = require('internal/freelist');
const { ondrain } = require('internal/http');
const incoming = require('_http_incoming');

const { IncomingMessage, readStart, readStop } = incoming;

const kIncomingMessage = Symbol('IncomingMessage');
const kOnHeaders = HTTPParser.kOnHeaders | 0;
const kOnHeadersComplete = HTTPParser.kOnHeadersComplete | 0;
const kOnBody = HTTPParser.kOnBody | 0;
const kOnMessageComplete = HTTPParser.kOnMessageComplete | 0;
const kOnExecute = HTTPParser.kOnExecute | 0;

const MAX_HEADER_PAIRS = 2000;

// Only called in the slow case where slow means
// that the request headers were either fragmented
// across multiple TCP packets or too large to be
// processed in a single run. This method is also
// called to process trailing HTTP headers.
function parserOnHeaders(headers, url) {
  // Once we exceeded headers limit - stop collecting them
  if (this.maxHeaderPairs <= 0 || this._headers.length < this.maxHeaderPairs) {
    this._headers = this._headers.concat(headers);
  }
  this._url += url;
}

// `headers` and `url` are set only if .onHeaders() has not been called for
// this request.
// `url` is not set for response parsers but that's not applicable here since
// all our parsers are request parsers.
function parserOnHeadersComplete(
  versionMajor,
  versionMinor,
  headers,
  method,
  url,
  statusCode,
  statusMessage,
  upgrade,
  shouldKeepAlive
) {
  const parser = this;
  const { socket } = parser;

  if (headers === undefined) {
    headers = parser._headers;
    parser._headers = [];
  }

  if (url === undefined) {
    url = parser._url;
    parser._url = '';
  }

  // Parser is also used by http client
  const ParserIncomingMessage =
    (socket && socket.server && socket.server[kIncomingMessage]) ||
    IncomingMessage;

  const incoming = (parser.incoming = new ParserIncomingMessage(socket));
  incoming.httpVersionMajor = versionMajor;
  incoming.httpVersionMinor = versionMinor;
  incoming.httpVersion = `${versionMajor}.${versionMinor}`;
  incoming.url = url;
  incoming.upgrade = upgrade;

  let n = headers.length;

  // If parser.maxHeaderPairs <= 0 assume that there's no limit.
  if (parser.maxHeaderPairs > 0) n = Math.min(n, parser.maxHeaderPairs);

  incoming._addHeaderLines(headers, n);

  if (typeof method === 'number') {
    // server only
    incoming.method = methods[method];
  } else {
    // client only
    incoming.statusCode = statusCode;
    incoming.statusMessage = statusMessage;
  }

  return parser.onIncoming(incoming, shouldKeepAlive);
}

function parserOnBody(b, start, len) {
  const stream = this.incoming;

  // if the stream has already been removed, then drop it.
  if (stream === null) return;

  // pretend this was the result of a stream._read call.
  if (len > 0 && !stream._dumped) {
    const slice = b.slice(start, start + len);
    const ret = stream.push(slice);
    if (!ret) readStop(this.socket);
  }
}

function parserOnMessageComplete() {
  const parser = this;
  const stream = parser.incoming;

  if (stream !== null) {
    stream.complete = true;
    // Emit any trailing headers.
    const headers = parser._headers;
    if (headers.length) {
      stream._addHeaderLines(headers, headers.length);
      parser._headers = [];
      parser._url = '';
    }

    // For emit end event
    stream.push(null);
  }

  // force to read the next incoming message
  readStart(parser.socket);
}

const parsers = new FreeList('parsers', 1000, () => {
  const parser = new HTTPParser(HTTPParser.REQUEST);

  cleanParser(parser);

  parser.onIncoming = null;
  parser[kOnHeaders] = parserOnHeaders;
  parser[kOnHeadersComplete] = parserOnHeadersComplete;
  parser[kOnBody] = parserOnBody;
  parser[kOnMessageComplete] = parserOnMessageComplete;

  return parser;
});

function closeParserInstance(parser) {
  parser.close();
}

// Free the parser and also break any links that it
// might have to any other things.
// TODO: All parser data should be attached to a
// single object, so that it can be easily cleaned
// up by doing `parser.data = {}`, which should
// be done in FreeList.free.  `parsers.free(parser)`
// should be all that is needed.
function freeParser(parser, req, socket) {
  if (parser) {
    if (parser._consumed) parser.unconsume();
    cleanParser(parser);
    if (parsers.free(parser) === false) {
      // Make sure the parser's stack has unwound before deleting the
      // corresponding C++ object through .close().
      setImmediate(closeParserInstance, parser);
    } else {
      // Since the Parser destructor isn't going to run the destroy() callbacks
      // it needs to be triggered manually.
      parser.free();
    }
  }
  if (req) {
    req.parser = null;
  }
  if (socket) {
    socket.parser = null;
  }
}

function httpSocketSetup(socket) {
  socket.removeListener('drain', ondrain);
  socket.on('drain', ondrain);
}

const tokenRegExp = /^[\^_`a-zA-Z\-0-9!#$%&'*+.|~]+$/;
/**
 * Verifies that the given val is a valid HTTP token
 * per the rules defined in RFC 7230
 * See https://tools.ietf.org/html/rfc7230#section-3.2.6
 */
function checkIsHttpToken(val) {
  return tokenRegExp.test(val);
}

const headerCharRegex = /[^\t\x20-\x7e\x80-\xff]/;
/**
 * True if val contains an invalid field-vchar
 *  field-value    = *( field-content / obs-fold )
 *  field-content  = field-vchar [ 1*( SP / HTAB ) field-vchar ]
 *  field-vchar    = VCHAR / obs-text
 */
function checkInvalidHeaderChar(val) {
  return headerCharRegex.test(val);
}

function cleanParser(parser) {
  parser._headers = [];
  parser._url = '';
  parser.socket = null;
  parser.incoming = null;
  parser.outgoing = null;
  parser.maxHeaderPairs = MAX_HEADER_PAIRS;
  parser[kOnExecute] = null;
  parser._consumed = false;
}

const DEFAULT_AGENT_OPTIONS = {
  keepAlive: false,
  keepAliveMsecs: 1000,
  maxSockets: Number.POSITIVE_INFINITY,
  maxFreeSockets: 256,
  timeout: 60000
};

// default value of 80kb
// ref: https://github.com/nodejs/node-v0.x-archive/blob/597eb6a5aebbc2afbd76d16e568a86ed28509bc7/deps/http_parser/http_parser.h#L56
const maxHeaderSize = 80 * 1024;

module.exports = {
  _checkInvalidHeaderChar: checkInvalidHeaderChar,
  _checkIsHttpToken: checkIsHttpToken,
  chunkExpression: /(?:^|\W)chunked(?:$|\W)/i,
  continueExpression: /(?:^|\W)100-continue(?:$|\W)/i,
  CRLF: '\r\n',
  freeParser,
  httpSocketSetup,
  methods,
  parsers,
  kIncomingMessage,
  maxHeaderSize,
  DEFAULT_AGENT_OPTIONS
};
