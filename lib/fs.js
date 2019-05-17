/* jshint ignore:start */

const BufferedReader = require('@java/java.io.BufferedReader');
const InputStreamReader = require('@java/java.io.InputStreamReader');
const FileInputStream = require('@java/java.io.FileInputStream');
const BufferedWriter = require('@java/java.io.BufferedWriter');
const OutputStreamWriter = require('@java/java.io.OutputStreamWriter');
const FileOutputStream = require('@java/java.io.FileOutputStream');
const File = require('@java/java.io.File');
const path = require('path');
const { getStringFromBuffer } = require('internal/utils');

const constants = (exports.constants = {
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
});

exports.FSWatcher = function(watching) {
  this.watching = watching;

  this.change = function(eventType, file) {};

  this.error = function(error) {};

  this.close = function() {};
};

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
    this.close = function() {};
    this.open = function(descriptor) {};
    return this;
  }
}

exports.ReadStream = this.ReadStream;

class WriteStream {
  constructor(path, options) {
    this.path = path;
    this.options = options;
    this.close = function() {};
    this.open = function(descriptor) {};
    return this;
  }
}

exports.WriteStream = this.WriteStream;

exports.createReadStream = function(path, options) {
  this.options = options || {
    flags: 'r',
    encoding: null,
    fd: null,
    mode: constants.F_OK,
    autoClose: true
  };
  return new ReadStream(path);
};

exports.createWriteStream = function(path, options) {
  this.options = options || {
    flags: 'w',
    encoding: 'utf8',
    fd: null,
    mode: constants.F_OK,
    autoClose: true
  };
  return new WriteStream(path);
};

class Stats {
  constructor(
    isFile,
    isDirectory,
    isBlockDevice,
    isCharacterDevice,
    isSymbolicLink,
    isFIFO,
    isSocket
  ) {
    const _isFile = isFile || false;
    const _isDirectory = isDirectory || false;
    const _isBlockDevice = isBlockDevice || false;
    const _isCharacterDevice = isCharacterDevice || false;
    const _isSymbolicLink = isSymbolicLink || false;
    const _isFIFO = isFIFO || false;
    const _isSocket = isSocket || false;
    this.isFile = function() {
      return _isFile;
    };
    this.isDirectory = function() {
      return _isDirectory;
    };
    this.isBlockDevice = function() {
      return _isBlockDevice;
    };
    this.isCharacterDevice = function() {
      return _isCharacterDevice;
    };
    this.isSymbolicLink = function() {
      return _isSymbolicLink;
    };
    this.isFIFO = function() {
      return _isFIFO;
    };
    this.isSocket = function() {
      return _isSocket;
    };
  }
}

exports.Stats = Stats;

exports.watch = function(filename, options, listener) {};

exports.access = function(path, mode, callback) {
  this.path = path;
  this.mode = mode || constants.F_OK;
  this.callback = callback;
};

exports.accessSync = function(path, mode) {
  this.path = path;
  this.mode = mode || constants.F_OK;
};

exports.appendFile = function(file, data, options, callback) {
  this.file = file;
  this.data = data;
  this.options = options || {
    encoding: 'utf8',
    mode: constants.F_OK,
    flag: 'a'
  };
  this.callback = callback;
};

exports.appendFileSync = function(file, data, options) {
  this.file = file;
  this.data = data;
  this.options = options || {
    encoding: 'utf8',
    mode: constants.F_OK,
    flag: 'a'
  };
};

exports.chmod = function(path, mode, callback) {
  this.path = path;
  this.mode = mode;
  this.callback = callback;
};

exports.chmodSync = function(path, mode) {
  this.path = path;
  this.mode = mode;
};

exports.chown = function(path, uid, gid, callback) {
  this.path = path;
  this.uid = uid;
  this.gid = gid;
  this.callback = callback;
};

exports.chownSync = function(path, uid, gid) {
  this.path = path;
  this.uid = uid;
  this.gid = gid;
};

exports.close = function(fd, callback) {
  this.fd = fd;
  this.callback = callback;
};

exports.closeSync = function(fd) {
  this.fd = fd;
};

exports.exists = function(filename, callback) {
  try {
    const e = __cauldron__.getFile(filename).exists();
    if (!callback) {
      return e;
    } else {
      return callback(e, undefined);
    }
  } catch (ex) {
    if (!callback) {
      return false;
    }
    return callback(false, ex);
  }
};

exports.existsSync = function(filename) {
  const f = __cauldron__.getFile(filename);
  return f.exists();
};

exports.fchmod = function(fd, mode, callback) {};

exports.fchmodSync = function(fd, mode) {};

exports.fchown = function(fd, uid, gid, callback) {};

exports.fchownSync = function(fd, uid, gid) {};

exports.fdatasync = function(fd, callback) {};

exports.fdatasyncSync = function(fd) {};

exports.fstat = function(fd, callback) {};

exports.fstatSync = function(fd) {};

exports.fsync = function(fd, callback) {};

exports.fsyncSync = function(fd) {};

exports.ftruncate = function(fd, len, callback) {
  len = len || 0;
};

exports.ftruncateSync = function(fd, len) {
  len = len || 0;
};

exports.futimes = function(fd, atime, mtime, callback) {};

exports.futimesSync = function(fd, atime, mtime) {};

exports.lchmod = function(path, mode, callback) {};

exports.lchmodSync = function(path, mode) {};

exports.lchown = function(path, uid, gid, callback) {};

exports.lchownSync = function(path, uid, gid) {};

exports.link = function(existingPath, newPath, callback) {};

exports.linkSync = function(existingPath, newPath) {};

exports.lstat = function(path, callback) {};

exports.lstatSync = function(path) {};

exports.mkdir = function(path, mode, callback) {
  new Promise((resolve, reject) => {
    try {
      resolve(exports.mkdirSync(path, mode));
    } catch (ex) {
      reject(ex);
    }
  }).then(
    result => {
      if (!callback) {
        return;
      }
      callback(undefined, result);
    },
    err => {
      if (!callback) {
        return;
      }
      callback(err, undefined);
    }
  );
};

exports.mkdirSync = function(path, mode) {
  return new File(path).mkdirs();
};

exports.mkdtemp = function(prefix, options, callback) {};

exports.mkdtempSync = function(prefix, options) {};

exports.open = function(path, flags, mode, callback) {};

exports.openSync = function(path, flags, mode) {};

exports.read = function(location, buffer, offset, length, position, callback) {
  new Promise((resolve, reject) => {
    try {
      resolve(getStringFromBuffer(new FileInputStream(location), 'UTF8'));
    } catch (ex) {
      reject(ex);
    }
  }).then(
    result => {
      if (!callback) {
        return;
      }
      callback(undefined, result);
    },
    err => {
      if (!callback) {
        return;
      }
      callback(err, undefined);
    }
  );
};

exports.readSync = function(location, buffer, offset, length, position) {
  return getStringFromBuffer(new FileInputStream(location), 'UTF8');
};

exports.readdir = function(path, options, callback) {
  new Promise((resolve, reject) => {
    try {
      resolve(exports.readdirSync(path, options));
    } catch (ex) {
      reject(ex);
    }
  }).then(
    result => {
      if (!callback) {
        return;
      }
      callback(undefined, result);
    },
    err => {
      if (!callback) {
        return;
      }
      callback(err, undefined);
    }
  );
};

exports.readdirSync = function(path, options) {
  const directory = new File(path);
  if (!directory.isDirectory()) {
    throw 'Path must be a filename: ' + path;
  }
  const files = [];
  const dirContents = directory.listFiles();
  for (let i = 0; i < dirContents; i++) {
    if (dirContents[i].isFile()) {
      files.push(dirContents[i].getName());
    }
  }
  return files;
};

/**
 * Reads a file asynchronously.
 * @param {string} path The path of the file.
 * @param {Object} options Read file options for the buffer. Not implemented.
 * @param {function(string)} callback A function that passes in the result of the read operation.
 */
exports.readFile = function(path, options, callback) {
  new Promise((resolve, reject) => {
    try {
      resolve(getStringFromBuffer(new FileInputStream(path), 'UTF8'));
    } catch (ex) {
      reject(ex);
    }
  }).then(
    result => {
      if (!callback) {
        return;
      }
      callback(undefined, result);
    },
    err => {
      if (!callback) {
        return;
      }
      callback(err, undefined);
    }
  );
};

/**
 * Reads a file synchronously, returning the contents as a string.
 * @param {string} path The path of the file.
 * @param {Object} options Read file options for the buffer. Not implemented.
 * @returns {string}
 */
exports.readFileSync = function(path, options) {
  return getStringFromBuffer(new FileInputStream(path), 'UTF8');
};

exports.readlink = function(path, options, callback) {};

exports.readlinkSync = function(path, options) {};

exports.realpath = function(path, options, callback) {};

exports.realpathSync = function(filename, options) {
  return path.resolve(process.cwd(), filename);
};

exports.rename = function(oldPath, newPath, callback) {
  new Promise((resolve, reject) => {
    try {
      resolve(exports.renameSync(oldPath, newPath));
    } catch (ex) {
      reject(ex);
    }
  }).then(
    result => {
      if (!callback) {
        return;
      }
      callback(undefined, result);
    },
    err => {
      if (!callback) {
        return;
      }
      callback(err, undefined);
    }
  );
};

exports.renameSync = function(oldPath, newPath) {
  const oldf = new File(oldPath);
  const newf = new File(newPath);
  return oldf.renameTo(newf);
};

exports.rmdir = function(path, callback) {
  new Promise((resolve, reject) => {
    try {
      resolve(exports.rmdirSync(path));
    } catch (ex) {
      reject(ex);
    }
  }).then(
    result => {
      if (!callback) {
        return;
      }
      callback(undefined, result);
    },
    err => {
      if (!callback) {
        return;
      }
      callback(err, undefined);
    }
  );
};

exports.rmdirSync = function(path) {
  const f = __cauldron__.getFile(path);
  if (f.isDirectory()) {
    const subs = f.listFiles();
    for (let i = 0; i < subs.length; i++) {
      const sub = subs[i];
      if (sub.isFile()) {
        sub.delete();
      } else if (sub.isDirectory()) {
        exports.rmdirSync(sub.getAbsolutePath());
      }
    }
  }
  return f.delete();
};

exports.stat = function(path, callback) {};

exports.statSync = function(path) {
  const f = __cauldron__.getFile(path);
  if (!f.exists()) {
    return -1;
  }
  if (f.isFile()) {
    return 0;
  }
  if (f.isDirectory()) {
    return 1;
  }
  return -1;
};

exports.symlink = function(target, path, type, callback) {};

exports.symlinkSync = function(target, path, type) {};

exports.truncate = function(path, len, callback) {};

exports.truncateSync = function(path, len) {};

exports.unlink = function(path, callback) {};

exports.unlinkSync = function(path) {};

exports.unwatchFile = function(filename, listener) {};

exports.utimes = function(path, atime, mtime, callback) {};

exports.utimesSync = function(path, atime, mtime) {};

exports.watch = function(filename, options, listener) {};

exports.watchFile = function(filename, options, listener) {};

const _writeBuffer = function(fd, buffer, offset, length, position) {};

const _writeString = function(fd, string, position, encoding) {
  const file = new File(fd);
  file.createNewFile();
  const f_out = new BufferedWriter(
    new OutputStreamWriter(new FileOutputStream(file), encoding || 'UTF8')
  );

  f_out.write(string);
  f_out.flush();
  f_out.close();
};

exports.writeSync = function(fd, buffer, offset, length, position) {
  if (typeof buffer === 'string') {
    _writeString(fd, buffer, offset, length);
  } else {
    _writeBuffer(fd, buffer, offset, length, position);
  }
};

// when writing a string, offset will be used as the position and length will be used as the encoding. Position will be the callback
exports.write = function(fd, buffer, offset, length, position, callback) {
  new Promise((resolve, reject) => {
    try {
      resolve(exports.writeSync(fd, buffer, offset, length, position));
    } catch (ex) {
      reject(ex);
    }
  }).then(
    result => {
      if (!callback) {
        return;
      }
      callback(undefined, result);
    },
    err => {
      if (!callback) {
        return;
      }
    }
  );
};

exports.writeFile = function(file, data, options, callback) {
  new Promise((resolve, reject) => {
    try {
      resolve(exports.writeFileSync(file, data, options));
    } catch (ex) {
      reject(ex);
    }
  }).then(
    result => {
      if (!callback) {
        return;
      }
      callback(undefined, result);
    },
    err => {
      if (!callback) {
        return;
      }
      callback(err, undefined);
    }
  );
};

exports.writeFileSync = function(file, data, options) {
  const f = new File(file);
  f.createNewFile();
  const f_out = new BufferedWriter(
    new OutputStreamWriter(new FileOutputStream(f), 'UTF8')
  );
  f_out.write(data.toString(), 0, data.toString().length);
  f_out.flush();
  f_out.close();
};

exports.new = function(location, data) {
  const file = new File(data);
  file.createNewFile();
  const f_out = new BufferedWriter(
    new OutputStreamWriter(new FileOutputStream(file), 'UTF8')
  );

  f_out.append(data);
  f_out.flush();
  f_out.close();
};

exports.clear = function(location) {
  save(file, '');
};

exports.mkdirs = function(directory) {
  new File(directory).mkdirs();
};

exports.isPath = function(location) {
  return new File(location).isDirectory();
};

exports.isFile = function(location) {
  return new File(location).isFile();
};

/* jshint ignore:end */
