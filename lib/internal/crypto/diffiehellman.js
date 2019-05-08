function DiffieHellman() {
  this.verifyError = undefined;
}

DiffieHellman.prototype.computeSecret = function(
  otherPublicKey,
  inputEncoding,
  outputEncoding
) {};

DiffieHellman.prototype.generateKeys = function(encoding) {};

DiffieHellman.prototype.getGenerator = function(encoding) {};

DiffieHellman.prototype.getPrime = function(encoding) {};

DiffieHellman.prototype.getPrivateKey = function(encoding) {};

DiffieHellman.prototype.getPublicKey = function(encoding) {};

DiffieHellman.prototype.setPrivateKey = function(privateKey, encoding) {};

DiffieHellman.prototype.setPublicKey = function(publicKey, encoding) {};

function ECDH() {}

ECDH.prototype.convertKey = function(
  key,
  curve,
  inputEncoding,
  outputEncoding,
  format
) {};

ECDH.prototype.computeSecret = function(
  otherPublicKey,
  inputEncoding,
  outputEncoding
) {};

ECDH.prototype.generateKeys = function(encoding, format) {};

ECDH.prototype.getPrivateKey = function(encoding) {};

ECDH.prototype.getPublicKey = function(encoding, format) {};

ECDH.prototype.setPrivateKey = function(privateKey, encoding) {};

ECDH.prototype.setPublicKey = function(publicKey, encoding) {};

module.exports = {
  DiffieHellman,
  ECDH
};
