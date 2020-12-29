'use strict';

const { URI } = require('java/net');

const kURLContext = Symbol('urlContext');

function toUSVString(val) {}

class URLSearchParams {}

class URLContext {
  constructor(javaUrl) {
    this.javaUrl = javaUrl;
    this.host = javaUrl.getHost();
    this.hash = javaUrl.getFragment();
    this.hostname = javaUrl.getHost().split(':')[0];
    this.port = javaUrl.getPort() || javaUrl.getDefaultPort();
    this.href = null;
    this.origin = null;
    this.password = null;
    this.pathname = javaUrl.getPath();
    this.protocol = javaUrl.getProtocol();
    this.search = null;
    this.searchParams = null;
    this.username = javaUrl.getUserInfo();
  }
}

class URL {
  constructor(input, base) {
    let uri = new URI(input);
    // TODO: safety check?
    if (!uri.isAbsolute()) uri = new URI(base + input);
    this[kURLContext] = new URLContext(uri);
  }
  toString() {}
  toJSON() {}
}

Object.defineProperties(URL.prototype, {
  host: {
    get() {
      return this[kURLContext].host;
    }
  },
  hash: {
    get() {
      return this[kURLContext].hash;
    }
  },
  hostname: {
    get() {
      // a hackish way to do this atm
      return this[kURLContext].hostname;
    }
  },
  href: {
    get() {
      return this[kURLContext].href;
    }
  },
  origin: {
    get() {
      return this[kURLContext].origin;
    }
  },
  password: {
    get() {
      return this[kURLContext].password;
    }
  },
  pathname: {
    get() {
      return this[kURLContext].pathname;
    }
  },
  port: {
    get() {
      return this[kURLContext].port;
    }
  },
  protocol: {
    get() {
      return this[kURLContext].protocol;
    }
  },
  search: {
    get() {
      return this[kURLContext].search;
    }
  },
  searchParams: {
    get() {
      return this[kURLContext].searchParams;
    }
  },
  username: {
    get() {
      return this[kURLContext].username;
    }
  }
});

function encodeStr(str, noEscapeTable, hexTable) {
  const len = str.length;
  if (len === 0) return '';

  let out = '';
  let lastPos = 0;

  for (let i = 0; i < len; i++) {
    let c = str.charCodeAt(i);

    // ASCII
    if (c < 0x80) {
      if (noEscapeTable[c] === 1) continue;
      if (lastPos < i) out += str.slice(lastPos, i);
      lastPos = i + 1;
      out += hexTable[c];
      continue;
    }

    if (lastPos < i) out += str.slice(lastPos, i);

    // Multi-byte characters ...
    if (c < 0x800) {
      lastPos = i + 1;
      out += hexTable[0xc0 | (c >> 6)] + hexTable[0x80 | (c & 0x3f)];
      continue;
    }
    if (c < 0xd800 || c >= 0xe000) {
      lastPos = i + 1;
      out +=
        hexTable[0xe0 | (c >> 12)] +
        hexTable[0x80 | ((c >> 6) & 0x3f)] +
        hexTable[0x80 | (c & 0x3f)];
      continue;
    }
    // Surrogate pair
    ++i;
    const c2 = i < len ? str.charCodeAt(i) & 0x3ff : 0;
    lastPos = i + 1;
    c = 0x10000 + (((c & 0x3ff) << 10) | c2);
    out +=
      hexTable[0xf0 | (c >> 18)] +
      hexTable[0x80 | ((c >> 12) & 0x3f)] +
      hexTable[0x80 | ((c >> 6) & 0x3f)] +
      hexTable[0x80 | (c & 0x3f)];
  }
  if (lastPos === 0) return str;
  if (lastPos < len) return out + str.slice(lastPos);
  return out;
}

function domainToASCII(domain) {
  return new URI(domain).toASCIIString();
}

function domainToUnicode(domain) {}

// Utility function that converts a URL object into an ordinary
// options object as expected by the http.request and https.request
// APIs.
function urlToOptions(url) {
  const options = {
    protocol: url.protocol,
    hostname: url.hostname.startsWith('[')
      ? url.hostname.slice(1, -1)
      : url.hostname,
    hash: url.hash,
    search: url.search,
    pathname: url.pathname,
    path: `${url.pathname}${url.search}`,
    href: url.href
  };
  if (url.port !== '') {
    options.port = Number(url.port);
  }
  if (url.username || url.password) {
    options.auth = `${url.username}:${url.password}`;
  }
  return options;
}

function getPathFromURL(path) {}

function getURLFromFilePath(filepath) {}

const formatSymbol = Symbol('urlFormat');
const searchParamsSymbol = Symbol('urlSearchParams');

module.exports = {
  toUSVString,
  getPathFromURL,
  getURLFromFilePath,
  URL,
  URLSearchParams,
  domainToASCII,
  domainToUnicode,
  urlToOptions,
  formatSymbol,
  searchParamsSymbol,
  encodeStr
};
