const fscore = require('internal/fs/core');

class FileHandle {
  constructor() {
    this._path = null;
  }

  appendFile(data, options) {
    return new Promise((resolve, reject) =>
      fscore.appendFile(this._path, data, options, (err, data) =>
        err ? reject(err) : resolve(data)
      )
    );
  }

  chmod(mode) {
    return new Promise((resolve, reject) =>
      fscore.chmod(this._path, mode, (err, data) =>
        err ? reject(err) : resolve(data)
      )
    );
  }

  chown(uid, gid) {
    return new Promise((resolve, reject) =>
      fscore.chown(this._path, uid, gid, (err, data) =>
        err ? reject(err) : resolve(data)
      )
    );
  }

  close() {}

  datasync() {
    return new Promise((resolve, reject) =>
      fscore.fdatasync(2, err => (err ? reject(err) : resolve()))
    );
  }

  read(buffer, offset, length, position) {}

  readFile(options) {}

  stat(options = null) {}

  sync() {}

  truncate(len) {}

  utimes(atime, mtime) {}

  write(...args) {}

  writeFile(data, options) {}

  writev(buffers, position) {}
}

const access = (path, mode) => {};

const appendFile = (path, data, options) => {};

const chmod = (path, mode) => {};

const chown = (path, uid, gid) => {};

const copyFile = (src, dest, flags) => {};

const lchmod = (path, mode) => {};

const link = (existingPath, newPath) => {};

const lstat = (path, options) => {};

const mkdir = (path, options) => {};

const mkdtemp = (prefix, options) => {};

const open = (path, flags, mode) => {};

const opendir = (path, options) => {};

const readdir = (path, options) => {};

const readFile = (path, options) => {};

const readlink = (path, options) => {};

const realpath = (path, options) => {};

const rename = (oldPath, newPath) => {};

const rmdir = (path, options) => {};

const stat = (path, options) => {};

const symlink = (target, path, type) => {};

const truncate = (path, len) => {};

const unlink = path => {};

const utimes = (path, atime, mtime) => {};

const writeFile = (file, data, options) => {};

module.exports = {
  FileHandle,
  access,
  appendFile,
  chmod,
  chown,
  copyFile,
  lchmod,
  link,
  lstat,
  mkdir,
  mkdtemp,
  open,
  opendir,
  readdir,
  readFile,
  readlink,
  realpath,
  rename,
  rmdir,
  stat,
  symlink,
  truncate,
  unlink,
  utimes,
  writeFile
};
