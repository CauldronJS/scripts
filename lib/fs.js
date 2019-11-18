/* eslint-disable max-params */
/* eslint-disable no-unused-vars */
/* jshint ignore:start */
const {
  FileInputStream,
  BufferedWriter,
  OutputStreamWriter,
  FileOutputStream
} = require('java/io');
const path = require('path');
const { getStringFromBuffer } = require('internal/util');

const constants = {
  // file access
  F_OK: 0,
  R_OK: 1,
  W_OK: 2,
  X_OK: 3,
  // file open
  O_RDONLY: 4,
  O_WRONLY: 5,
  O_RDWR: 6,
  O_CREAT: 7,
  O_EXCL: 8,
  O_NOCTTY: 9,
  O_TRUNC: 10,
  O_APPEND: 11,
  O_DIRECTORY: 12,
  O_NOATIME: 13,
  O_NOFOLLOW: 14,
  O_SYNC: 15,
  O_SYMLINK: 16,
  O_DIRECT: 17,
  O_NONBLOCK: 18,
  // file type
  S_IFMT: 19,
  S_IFREG: 20,
  S_IFDIR: 21,
  S_IFCHR: 22,
  S_IFBLK: 23,
  S_IFIFO: 24,
  S_IFLNK: 25,
  S_IFSOCK: 26,
  // file mode
  S_IRWXU: 27,
  S_IRUSR: 28,
  S_IWUSR: 29,
  S_IXUSR: 30,
  S_IRWXG: 31,
  S_IRGRP: 32,
  S_IWGRP: 33,
  S_IXGRP: 34,
  S_IRWXO: 35,
  S_IROTH: 36,
  S_IWOTH: 37,
  S_IXOTH: 38
};

class FSWatcher {
  constructor(watching) {
    this.watching = watching;
  }

  change(eventType, file) {}

  error(error) {}

  close() {}
}

class ReadStream {
  constructor(path, options) {
    this.path = path;
    this.bytesRead = 0;
    this.position = 0;
    this.end = -1;
    this.options = options;
    if (this.options.start) {
      this.position = this.options.start;
    }
    if (this.options.end && this.options.end > this.position) {
      this.end = this.options.end;
    }
  }

  close() {}

  open(descriptor) {}
}

class WriteStream {
  constructor(path, options) {
    this.path = path;
    this.options = options;
  }

  close() {}

  open(descriptor) {}
}

const DEFAULT_READ_STREAM_OPTIONS = {
  flags: 'r',
  encoding: null,
  fd: null,
  mode: constants.F_OK,
  autoClose: true
};

const createReadStream = (path, options) => {
  return new ReadStream(path, {
    ...DEFAULT_READ_STREAM_OPTIONS,
    ...options
  });
};

const DEFAULT_WRITE_STREAM_OPTIONS = {
  flags: 'w',
  encoding: 'utf8',
  fd: null,
  mode: constants.F_OK,
  autoClose: true
};

const createWriteStream = (path, options) => {
  return new WriteStream(path, {
    ...DEFAULT_WRITE_STREAM_OPTIONS,
    ...options
  });
};

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

const { getFile, readFile } = __cauldron__;

// consts will be exports, named functions are not

const access = (path, mode, callback) => {};

const accessSync = (path, mode) => {};

const appendFile = (path, data, options, callback) => {};

const appendFileSync = (path, data, options) => {};

const chmod = (path, mode, callback) => {};

const chmodSync = (path, mode) => {};

const chown = (path, uid, gid, callback) => {};

const chownSync = (path, uid, gid) => {};

const close = (fd, callback) => {};

const closeSync = fd => {};

const copyFile = (src, dest, flags, callback) => {};

const copyFileSync = (src, dest, flags) => {};

/**
 * @deprecated
 * @param {*} path
 * @param {*} callback
 */
const exists = (path, callback) => {};

const existsSync = path => {};

const fchmod = (fd, mode, callback) => {};

const fchmodSync = (fd, mode) => {};

const fchown = (fd, uid, gid, callback) => {};

const fchownSync = (fd, uid, gid) => {};

const fdatasync = (fd, callback) => {};

const fdatasyncSync = fd => {};

const fstat = (fd, options, callback) => {};

const fstatSync = (fd, options) => {};

const fsync = (fd, callback) => {};

const fsyncSync = fd => {};

const ftruncate = (fd, len, callback) => {};

const ftruncateSync = (fd, len) => {};

module.exports = {
  constants,
  ReadStream,
  WriteStream,
  FSWatcher,
  createReadStream,
  createWriteStream,
  Stats
};
