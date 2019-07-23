const BufferedReader = require('@java/java.io.BufferedReader');
const InputStreamReader = require('@java/java.io.InputStreamReader');
const inspect = require('internal/util/inspect');
const {
  codes: { ERR_INVALID_ARG_TYPE }
} = require('errors');

function createArrayFromString(input, length) {
  const result = [];
  for (let i = 0; i < length; ++i) {
    result[i] = input.toString();
  }
  return result;
}

function getStringFromBuffer(buffer) {
  let result = '';
  const fIn = new BufferedReader(new InputStreamReader(buffer));
  let line;
  while ((line = fIn.readLine()) != null) {
    result += line + '\r\n';
  }
  fIn.close();
  return result;
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
              depth: 4
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

function debuglog(target) {}

const types = {
  isUintArray() {
    return false;
  }
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
  for (let item of collection) {
    if (predicate(item)) {
      result.push(item);
    }
  }
  return result;
}

module.exports = {
  createArrayFromString,
  getStringFromBuffer,
  customInspectSymbol: Symbol.for('cauldron.util.inspect.custom'),
  inspect,
  deprecate,
  format,
  formatWithOptions,
  inherits,
  isConsole,
  types,
  debuglog,
  get,
  isFalse,
  where
};
