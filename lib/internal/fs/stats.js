class Stats {
  // eslint-disable-next-line max-params
  constructor(
    isFile,
    isDirectory,
    isBlockDevice,
    isCharacterDevice,
    isSymbolicLink,
    isFIFO,
    isSocket
  ) {
    this._isFile = isFile;
    this._isDirectory = isDirectory;
    this._isBlockDevice = isBlockDevice;
    this._isCharacterDevice = isCharacterDevice;
    this._isSymbolicLink = isSymbolicLink;
    this._isFIFO = isFIFO;
    this._isSocket = isSocket;
  }

  isFile() {
    return this._isFile;
  }

  isDirectory() {
    return this._isDirectory;
  }

  isBlockDevice() {
    return this._isBlockDevice;
  }

  isCharacterDevice() {
    return this._isCharacterDevice;
  }

  isSymbolicLink() {
    return this._isSymbolicLink;
  }

  isFIFO() {
    return this._isFIFO;
  }

  isSocket() {
    return this._isSocket;
  }
}

module.exports = Stats;
