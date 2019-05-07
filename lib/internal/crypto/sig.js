function Sign() {}

Sign.prototype.sign = function(privateKey, outputFormat) {};

Sign.prototype.update = function(data, inputEncoding) {};

function Verify() {}

Verify.prototype.update = function(data, inputEncoding) {};

Verify.prototype.verify = function(object, signature, signatureFormat) {};

module.exports = {
  Sign,
  Verify
};
