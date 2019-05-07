function Cipher() {}

Cipher.prototype.final = function(outputEncoding) {};

Cipher.prototype.setAAD = function(buffer, options) {};

Cipher.prototype.getAuthTag = function() {};

Cipher.prototype.setAutoPadding = function(autoPadding) {};

Cipher.prototype.update = function(data, inputEncoding, outputEncoding) {};

function Decipher() {}

Decipher.prototype.final = function(outputEncoding) {};

Decipher.prototype.setAAD = function(buffer) {};

Decipher.prototype.setAuthTag = function(buffer) {};

Decipher.prototype.setAutoPadding = function(autoPadding) {};

Decipher.prototype.update = function(data, inputEncoding, outputEncoding) {};

module.exports = {
  Cipher,
  Decipher
};
