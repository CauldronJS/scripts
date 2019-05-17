const {
  CHAR_LINE_FEED,
  CHAR_CARRIAGE_RETURN,
  CHAR_EXCLAMATION_MARK,
  CHAR_HASH
} = require('internal/constants');
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const stripBOM = content => {
  if (content.charCodeAt(0) === 0xfeff) {
    content = content.slice(1);
  }
  return content;
};

const stripShebang = content => {
  const contLen = content.length;
  if (contLen >= 2) {
    if (
      content.charCodeAt(0) === CHAR_HASH &&
      content.charCodeAt(1) === CHAR_EXCLAMATION_MARK
    ) {
      if (contLen === 2) {
        content = '';
      } else {
        let i = 2;
        for (; i < contLen; ++i) {
          const code = content.charCodeAt(i);
          if (code === CHAR_LINE_FEED || code === CHAR_CARRIAGE_RETURN) {
            break;
          }
        }
        if (i === contLen) {
          content = '';
        } else {
          content = content.slice(i);
        }
      }
    }
  }
  return content;
};

module.exports = {
  stripBOM,
  stripShebang
};
