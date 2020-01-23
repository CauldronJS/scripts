class Cipher {
  final(outputEncoding) {}

  setAAD(buffer, options) {}

  getAuthTag() {}

  setAutoPadding(autoPadding) {}

  update(data, inputEncoding, outputEncoding) {}
}

class Decipher {
  final(outputEncoding) {}

  setAAD(buffer) {}

  setAuthTag(buffer) {}

  setAutoPadding(autoPadding) {}

  update(data, inputEncoding, outputEncoding) {}
}
module.exports = {
  Cipher,
  Decipher
};
