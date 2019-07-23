/*

The MIT License (MIT)

Original Library
  - Copyright (c) Marak Squires

Additional functionality
 - Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/

const colors = {};
module.exports = colors;

colors.themes = {};

const util = require('util');
const ansiStyles = (colors.styles = require('./styles'));

const defineProps = Object.defineProperties;
const newLineRegex = new RegExp(/[\r\n]+/g);

colors.stripColors = colors.strip = function(str) {
  return ('' + str).replace(/\xA7/g, '');
};

// eslint-disable-next-line no-unused-vars
const stylize = (colors.stylize = function stylize(str, style) {
  return ansiStyles[style].open + str + ansiStyles[style].close;
});

const matchOperatorsRe = /[|\\{}()[\]^$+*?.]/g;
const escapeStringRegexp = function(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string');
  }
  return str.replace(matchOperatorsRe, '\\$&');
};

function build(_styles) {
  const builder = function builder() {
    return applyStyle.apply(builder, arguments);
  };
  builder._styles = _styles;
  // __proto__ is used because we must return a function, but there is
  // no way to create a function with a different prototype.
  builder.prototype = proto;
  return builder;
}

const styles = (function() {
  const ret = {};
  ansiStyles.grey = ansiStyles.gray;
  Object.keys(ansiStyles).forEach(key => {
    ansiStyles[key].closeRe = new RegExp(
      escapeStringRegexp(ansiStyles[key].close),
      'g'
    );
    ret[key] = {
      get() {
        return build(this._styles.concat(key));
      }
    };
  });
  return ret;
})();

const proto = defineProps(() => {}, styles);

function applyStyle(...args) {
  let str = args
    .map(arg => {
      if (arg !== undefined && arg.constructor === String) {
        return arg;
      } else {
        return util.inspect(arg);
      }
    })
    .join(' ');

  if (!str) {
    return str;
  }

  const newLinesPresent = str.indexOf('\n') !== -1;

  const nestedStyles = this._styles;

  let i = nestedStyles.length;
  while (i--) {
    const code = ansiStyles[nestedStyles[i]];
    str = code.open + str.replace(code.closeRe, code.open) + code.close;
    if (newLinesPresent) {
      str = str.replace(newLineRegex, match => {
        return code.close + match + code.open;
      });
    }
  }

  return str;
}

colors.setTheme = function(theme) {
  if (typeof theme === 'string') {
    console.log(
      'colors.setTheme now only accepts an object, not a string.  ' +
        'If you are trying to set a theme from a file, it is now your (the ' +
        "caller's) responsibility to require the file.  The old syntax " +
        'looked like colors.setTheme(__dirname + ' +
        "'/../themes/generic-logging.js'); The new syntax looks like " +
        'colors.setTheme(require(__dirname + ' +
        "'/../themes/generic-logging.js'));"
    );
    return;
  }
  for (const style in theme) {
    (function(style) {
      colors[style] = function(str) {
        if (typeof theme[style] === 'object') {
          let out = str;
          for (const i in theme[style]) {
            out = colors[theme[style][i]](out);
          }
          return out;
        }
        return colors[theme[style]](str);
      };
    })(style);
  }
};

function init() {
  const ret = {};
  Object.keys(styles).forEach(name => {
    ret[name] = {
      get() {
        return build([name]);
      }
    };
  });
  return ret;
}

const sequencer = function sequencer(map, str) {
  let exploded = str.split('');
  exploded = exploded.map(map);
  return exploded.join('');
};

// custom formatter methods
colors.trap = require('./custom/trap');
colors.zalgo = require('./custom/zalgo');

// maps
colors.maps = {};
colors.maps.america = require('./maps/america')(colors);
colors.maps.zebra = require('./maps/zebra')(colors);
colors.maps.rainbow = require('./maps/rainbow')(colors);
colors.maps.random = require('./maps/random')(colors);

for (const map in colors.maps) {
  (function(map) {
    colors[map] = function(str) {
      return sequencer(colors.maps[map], str);
    };
  })(map);
}

defineProps(colors, init());
