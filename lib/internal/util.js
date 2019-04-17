var BufferedReader = require('@java/java.io.BufferedReader');
var InputStreamReader = require('@java/java.io.InputStreamReader');
const inspect = require('internal/util/inspect');

function createArrayFromString (input, length) {
  var result = [];
  for (var i = 0; i < length; ++i) {
    result[i] = input.toString();
  }
  return result;
}

function getStringFromBuffer (buffer) {
  var result = '';
  var fIn = new BufferedReader(new InputStreamReader(buffer));
  var line;
  while ((line = fIn.readLine()) != null) {
    result += line + '\r\n';
  }
  fIn.close();
  return result;
}

module.exports = {
  createArrayFromString,
  getStringFromBuffer,
  customInspectSymbol: Symbol.for('cauldron.util.inspect.custom'),
  inspect
};
