const inspect = require('internal/util/inspect');
const {
  codes: { ERR_INVALID_ARG_TYPE },
} = require('errors');

function createArrayFromString(input, length) {
  const result = [];
  for (let i = 0; i < length; ++i) {
    result[i] = input.toString();
  }
  return result;
}

// Return undefined if there is no match.
// Move the "slow cases" to a separate function to make sure this function gets
// inlined properly. That prioritizes the common case.
function normalizeEncoding(enc) {
  if (enc == null || enc === 'utf8' || enc === 'utf-8') return 'utf8';
  return slowCases(enc);
}

function slowCases(enc) {
  switch (enc.length) {
    case 4:
      if (enc === 'UTF8') return 'utf8';
      if (enc === 'ucs2' || enc === 'UCS2') return 'utf16le';
      enc = `${enc}`.toLowerCase();
      if (enc === 'utf8') return 'utf8';
      if (enc === 'ucs2') return 'utf16le';
      break;
    case 3:
      if (enc === 'hex' || enc === 'HEX' || `${enc}`.toLowerCase() === 'hex')
        return 'hex';
      break;
    case 5:
      if (enc === 'ascii') return 'ascii';
      if (enc === 'ucs-2') return 'utf16le';
      if (enc === 'UTF-8') return 'utf8';
      if (enc === 'ASCII') return 'ascii';
      if (enc === 'UCS-2') return 'utf16le';
      enc = `${enc}`.toLowerCase();
      if (enc === 'utf-8') return 'utf8';
      if (enc === 'ascii') return 'ascii';
      if (enc === 'ucs-2') return 'utf16le';
      break;
    case 6:
      if (enc === 'base64') return 'base64';
      if (enc === 'latin1' || enc === 'binary') return 'latin1';
      if (enc === 'BASE64') return 'base64';
      if (enc === 'LATIN1' || enc === 'BINARY') return 'latin1';
      enc = `${enc}`.toLowerCase();
      if (enc === 'base64') return 'base64';
      if (enc === 'latin1' || enc === 'binary') return 'latin1';
      break;
    case 7:
      if (
        enc === 'utf16le' ||
        enc === 'UTF16LE' ||
        `${enc}`.toLowerCase() === 'utf16le'
      )
        return 'utf16le';
      break;
    case 8:
      if (
        enc === 'utf-16le' ||
        enc === 'UTF-16LE' ||
        `${enc}`.toLowerCase() === 'utf-16le'
      )
        return 'utf16le';
      break;
    default:
      if (enc === '') return 'utf8';
  }
}

const codesWarned = Object.create(null);

function deprecate(fn, msg, code) {
  if (process.noDeprecation) {
    return fn;
  }
  if (code !== undefined && typeof code !== 'string') {
    throw new ERR_INVALID_ARG_TYPE('code', 'string', code);
  }

  let warned = false;
  function deprecated(...args) {
    if (!warned) {
      warned = true;
      if (code !== undefined) {
        if (!codesWarned[code]) {
          console.warn(`<DEPRECATION WARNING> ${msg}`);
        }
      } else {
        console.warn(`<DEPRECATION WARNING> ${msg}`);
      }
    }
    if (new.target) {
      return Reflect.construct(fn, args, new.target);
    } else {
      return fn.apply(this, args);
    }
  }

  Object.setPrototypeOf(deprecated, fn);
  if (fn.prototype) {
    deprecated.prototype = fn.prototype;
  }
  return deprecated;
}

const featuresWarned = Object.create(null);
/**
 *
 * @param {String} feature
 */
function emitExperimentalWarning(feature) {
  if (!featuresWarned[feature]) {
    console.debug(
      `Warning: the feature ${feature} is experimental. This means the API is subject to change and not guaranteed.`
    );
    featuresWarned[feature] = true;
  }
}

function format() {
  return formatWithOptions(null, Array.prototype.slice.call(arguments, 0));
}

function formatWithOptions(inspectOptions, f) {
  let i, tempStr;
  if (typeof f !== 'string') {
    if (arguments.length === 1) {
      return '';
    }
    let res = '';
    for (i = 1; i < arguments.length - 1; i++) {
      res += inspect(arguments[i], inspectOptions);
      res += ' ';
    }
    res += inspect(arguments[i], inspectOptions);
    return res;
  }

  if (arguments.length === 2) {
    return f;
  }

  let str = '';
  let a = 2;
  let lastPos = 0;
  for (i = 0; i < f.length - 1; i++) {
    if (f.charCodeAt(i) === 37) {
      const nextChar = f.charCodeAt(++i);
      if (a !== arguments.length) {
        switch (nextChar) {
          case 115:
            tempStr = String(arguments[a++]);
            break;
          case 106:
            tempStr = arguments[a++].toString();
            break;
          case 100:
            tempStr = '' + Number(arguments[a++]);
            break;
          case 79:
            tempStr = inspect(arguments[a++], inspectOptions);
            break;
          case 111:
            tempStr = inspect(arguments[a++], {
              showHidden: true,
              showProxy: true,
              depth: 4,
            });
            break;
          case 105:
            tempStr = '' + parseInt(arguments[a++]);
            break;
          case 102:
            tempStr = '' + parseFloat(arguments[a++]);
            break;
          case 37:
            str += f.slice(lastPos, i);
            lastPos = i + 1;
            continue;
          default:
            continue;
        }

        if (lastPos !== i - 1) {
          str += f.slice(lastPos, i - 1);
        }
        str += tempStr;
        lastPos = i + 1;
      } else if (nextChar === 37) {
        str += f.slice(lastPos, i);
        lastPos = i + 1;
      }
    }
  }

  if (lastPos === 0) {
    str = f;
  } else if (lastPos < f.length) {
    str += f.slice(lastPos);
  }
  while (a < arguments.length) {
    const x = arguments[a++];
    if ((typeof x !== 'object' && typeof x !== 'symbol') || x === null) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x, inspectOptions);
    }
  }

  return str;
}

function inherits(ctor, superCtor) {
  if (!ctor) {
    throw new ERR_INVALID_ARG_TYPE('ctor', 'Function', ctor);
  }
  if (!superCtor) {
    throw new ERR_INVALID_ARG_TYPE('superCtor', 'Function', superCtor);
  }
  if (superCtor.prototype === undefined) {
    throw new ERR_INVALID_ARG_TYPE(
      'superCtor.prototype',
      'Function',
      superCtor.prototype
    );
  }

  ctor.super_ = superCtor;
  Object.setPrototypeOf(ctor.prototype, superCtor.prototype);
}

function isConsole(target) {
  return target instanceof Java.type('org.bukkit.command.ConsoleCommandSender');
}

function debuglog() {}

const types = {
  isUintArray() {
    return false;
  },
};

function get(target, value) {
  let lastVal = target;
  const path = value.split('.');
  for (let i = 0; i < path.length; ++i) {
    const entry = path[i];
    if (lastVal[entry]) {
      lastVal = lastVal[entry];
    } else {
      return lastVal[entry];
    } // will return null or undefined
  }
  return lastVal;
}

function isFalse(value) {
  return value !== undefined && !value;
}

/**
 *
 * @param {(item:*) => boolean} predicate
 * @param {Array} collection
 */
function where(predicate, collection) {
  const result = [];
  for (const item of collection) {
    if (predicate(item)) {
      result.push(item);
    }
  }
  return result;
}

function once(callback) {
  let called = false;
  return function (...args) {
    if (called) return;
    called = true;
    callback.apply(this, args);
  };
}

function* toIterable(enumeration) {
  while (enumeration.hasMoreElements()) {
    yield enumeration.nextElement();
  }
}

function overload(descriptor) {
  // the descriptor is a map of what is possible as arguments
  return function (...args) {
    const key = args.length;
    const argKeys = descriptor[key];
    if (!argKeys) {
      throw new Error('Invalid overload passed');
    }
    return argKeys.reduce(
      (argCollection, key) => ({
        ...argCollection,
        [key]: args.values().next(),
      }),
      {}
    );
  };
}

// from https://github.com/feross/typedarray-to-buffer/blob/master/index.js
function typedarrayToBuffer(arr) {
  // To avoid a copy, use the typed array's underlying ArrayBuffer to back new Buffer
  let buf = Buffer.from(arr.buffer);
  if (arr.byteLength !== arr.buffer.byteLength) {
    // Respect the "view", i.e. byteOffset and byteLength, without doing a copy
    buf = buf.slice(arr.byteOffset, arr.byteOffset + arr.byteLength);
  }
  return buf;
}

/**
 *
 * @param {string[]} array
 */
function properlyTypeArray(array) {
  return array.map((item) => {
    if (!isNaN(parseInt(item)) && parseInt(item).toString() === item)
      return parseInt(item);
    else if (item === 'true') return true;
    else if (item === 'false') return false;
    else if (item === 'null') return null;
    else return item;
  });
}

function assertCrypto() {
  // TODO: check that OpenSSL is installed and throw error
}

module.exports = {
  createArrayFromString,
  customInspectSymbol: Symbol.for('cauldron.util.inspect.custom'),
  inspect,
  deprecate,
  emitExperimentalWarning,
  format,
  formatWithOptions,
  inherits,
  isConsole,
  normalizeEncoding,
  types,
  debuglog,
  get,
  isFalse,
  where,
  once,
  toIterable,
  overload,
  typedarrayToBuffer,
  properlyTypeArray,
  assertCrypto,
};
