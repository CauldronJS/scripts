const { appendFile, chmod, chown, fdatasync } = require('internal/fs/core');

class FileHandle {
  constructor() {
    this._path = null;
  }

  appendFile(data, options) {
    return new Promise((resolve, reject) =>
      appendFile(this._path, data, options, (err, data) =>
        err ? reject(err) : resolve(data)
      )
    );
  }

  chmod(mode) {
    return new Promise((resolve, reject) =>
      chmod(this._path, mode, (err, data) =>
        err ? reject(err) : resolve(data)
      )
    );
  }

  chown(uid, gid) {
    return new Promise((resolve, reject) =>
      chown(this._path, uid, gid, (err, data) =>
        err ? reject(err) : resolve(data)
      )
    );
  }

  close() {}

  datasync() {
    return new Promise((resolve, reject) =>
      fdatasync(2, err => (err ? reject(err) : resolve()))
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
