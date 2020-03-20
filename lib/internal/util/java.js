/**
 * Utils that can be used to make interaction with Java easier
 *
 * @file    \lib\internal\util\java.js
 * @author  Justin Cox <https://conji.me>
 */

const { BufferedReader, InputStreamReader } = require('java/io');
const StandardCharsets = require('java/nio/charset/StandardCharsets');

exports.getStringFromBuffer = buffer => {
  let result = '';
  const fIn = new BufferedReader(new InputStreamReader(buffer));
  let line;
  while ((line = fIn.readLine()) != null) {
    result += line + '\r\n';
  }
  fIn.close();
  return result;
};

exports.byteSize = data => {
  if (typeof data === 'string') {
    return new java.lang.String(data).getBytes('UTF-8').length();
  }
  throw new Error('Cannot get byte size of non-string');
};

exports.isException = obj => obj instanceof Java.type('java.lang.Exception');

exports.ENCODING_MAP = {
  utf8: StandardCharsets.UTF_8,
  'utf-8': StandardCharsets.UTF_8,
  utf16: StandardCharsets.UTF_16,
  'utf-16': StandardCharsets.UTF_16,
  ascii: StandardCharsets.US_ASCII
};
