/**
 * Utils that can be used to make interaction with Java easier
 *
 * @file    \lib\internal\util\java.js
 * @author  Justin Cox <https://conji.me>
 */

const BufferedReader = require('@java/java.io.BufferedReader');
const InputStreamReader = require('@java/java.io.InputStreamReader');

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
    return new java.lang.String(data).getBytes('UTF-8').length;
  }
  throw new Error('Cannot get byte size of non-string');
};
