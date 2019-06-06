/*
The MIT License (MIT)

Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com)

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

var styles = {};
module['exports'] = styles;

var codes = {
  reset: 'r',
  bold: 'l',
  italic: 'o',
  underline: 'n',
  strikethrough: 'm',
  obfuscated: 'k',

  black: '0',
  darkblue: '1',
  darkgreen: '2',
  darkaqua: '3',
  darkred: '4',
  darkpurple: '5',
  gold: '6',
  gray: '7',
  grey: '7',
  darkgray: '8',
  darkgrey: '8',
  blue: '9',
  green: 'a',
  aqua: 'b',
  red: 'c',
  lightpurple: 'd',
  yellow: 'e',
  white: 'f'
};

Object.keys(codes).forEach(function(key) {
  var val = codes[key];
  var style = (styles[key] = []);
  style.open = '\xA7' + val;
  style.close = '\xA7r';
});
