'use strict';

const { ERR_INVALID_ARG_TYPE } = require('internal/errors').codes;

const {
  CHAR_LINE_FEED,
  CHAR_CARRIAGE_RETURN,
  CHAR_EXCLAMATION_MARK,
  CHAR_HASH
} = require('internal/constants');

const stripBOM = content => {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

const stripShebang = content => {
  const contLen = content.length;
  if (contLen >= 2) {
    if (content.charCodeAt(0) === CHAR_HASH &&
      content.charCodeAt(1) === CHAR_EXCLAMATION_MARK) {
      if (contLen === 2) {
        content = '';
      } else {
        let i = 2;
        for (; i < contLen; ++i) {
          const code = content.charCodeAt(i);
          if (code === CHAR_LINE_FEED || code === CHAR_CARRIAGE_RETURN) break;
        }
        if (i === contLen) content = '';
        else content = content.slice(i);
      }
    }
  }
  return content;
}

const createDynamicModule = exports => {
  for (let field in exports) {
    // first make an immediate copy
    Object.defineProperty(exports, `$${field}`,
      Object.getOwnPropertyDescriptor(exports, field)
    );
    delete exports[field];
    Object.defineProperty(exports, field, {
      get: () => exports[`$${field}`],
      set: v => exports[`$${field}`] = v
    });
  }
  return exports;
}

module.exports = exports = {
  stripBOM,
  stripShebang,
  createDynamicModule
}
