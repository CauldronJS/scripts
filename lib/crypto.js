var certificate = require('internal/crypto/certificate');
var cipher = require('internal/crypto/cipher');
var dh = require('internal/crypto/diffiehellman');
var hash = require('internal/crypto/hash');
var random = require('internal/crypto/random');
var sig = require('internal/crypto/sig');

var errors = require('internal/errors');

var constants = {};
var DEFAULT_ENCODING = 'buffer';
var fips = false;

function createCipheriv (algorithm, key, iv, options) {

}

function createDecipheriv (algorithm, key, iv, options) {

}

function createDiffieHellmanFromPrime (prime, primeEncoding, generator, generatorEncoding) {

}

function createDiffieHellmanFromPrimeLength (primeLength, generator) {

}

function createDiffieHellman () {
  if (arguments.length === 0) {
    // throw error
  }
  if (typeof arguments[0] === 'number') {
    return createDiffieHellmanFromPrimeLength.call(this, arguments);
  } else {
    return createDiffieHellmanFromPrime.call(this, arguments);
  }
}

function createECDH (curveName) {

}

function createHash (algorithm, options) {

}

function createHmac (algorithm, key, options) {

}

function createSign (algorithm, options) {

}

function createVerify (algorithm, options) {

}

function getCiphers () {

}

function getCurves () {

}

function getDiffieHellman (groupName) {

}

function getFips () {
  return fips;
}

function getHashes () {

}

function pbkdf2 (password, salt, interations, keylen, digest, callback) {

}

function pbkdf2Sync (password, salt, iterations, keylen, digest) {

}

function privateDecrypt (privateKey, buffer) {

}

function privateEncrypt (privateKey, buffer) {

}

function publicDecrypt (key, buffer) {

}

function publicEncrypt (key, buffer) {

}

function randomBytes (size, callback) {

}

function randomFillSync (buffer, offset, size) {

}

function randomFill (buffer, offset, size, callback) {

}

function setEngine (engine, flags) {

}

function setFips (bool) {
  fips = bool;
}

function timingSafeEqual (a, b) {

}

module.exports = {
  constants,
  DEFAULT_ENCODING,
  createCipheriv,
  createDecipheriv,
  createDiffieHellman,
  createECDH,
  createHash,
  createHmac,
  createSign,
  createVerify,
  getCiphers,
  getCurves,
  getDiffieHellman,
  getFips,
  getHashes,
  pbkdf2,
  pbkdf2Sync,
  privateDecrypt,
  privateEncrypt,
  publicDecrypt,
  publicEncrypt,
  randomBytes,
  randomFillSync,
  randomFill,
  setEngine,
  setFips,
  timingSafeEqual
}
