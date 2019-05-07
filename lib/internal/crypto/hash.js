function Hash() {}

Hash.prototype.digest = function(encoding) {};

Hash.prototype.update = function(data, inputEncoding) {};

function Hmac() {}

Hmac.prototype.digest = function(encoding) {};

Hmac.prototype.update = function(data, inputEncoding) {};

module.exports = {
  Hash
};
