class Dir {
  constructor(path) {
    this.path = path;
  }

  close(callback = null) {}

  closeSync() {}

  read(callback = null) {}

  readSync() {}

  [Symbol.asyncIterator]() {
    //
  }
}

class Dirent {
  constructor(name) {
    this.name = name;
  }

  isBlockDevice() {}

  isCharacterDevice() {}

  isDirectory() {}

  isFIFO() {}

  isFile() {}

  isSocket() {}

  isSymbolicLink() {}
}

module.exports = {
  Dir,
  Dirent
};
