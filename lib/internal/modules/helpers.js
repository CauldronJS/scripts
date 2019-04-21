'use strict';

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

const createDynamicModule = exp => {
  if (!exp) return Object.create(null);
  for (let field in exp) {
    // first make an immediate copy
    if (!exp.hasOwnProperty || !exp.hasOwnProperty(field)) continue;
    Object.defineProperty(exp, `$${field}`,
      Object.getOwnPropertyDescriptor(exp, field)
    );
    delete exp[field];
    Object.defineProperty(exp, field, {
      get: async () => exp[`$${field}`],
      set: v => exp[`$${field}`] = v
    });
  }
  return exp;
}

module.exports = exports = {
  stripBOM,
  stripShebang,
  createDynamicModule
}
