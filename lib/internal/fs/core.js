/* eslint-disable no-unused-vars, max-params */
// consts will be exports, named functions are not

// TODO: probably shouldn't be using these later. ALSO MAKE THESE ACTUALLY ASYNC
const { writeStringToFile, getFile, read } = require('internal/cauldron/fs');
const _path = require('path');

/**
 *
 * @param {(...args) => any} fn
 * @param {(err: Error, result: any) => undefined} callback
 * @param  {...any} args
 */
const callbackify = (fn, callback, ...args) => {
  if (!callback) return;
  (async () => {
    try {
      callback(null, fn.apply(null, args));
    } catch (err) {
      callback(err, null);
    }
  })();
};

const sanitizePath = path => path.replace(/\\|\//g, _path.sep);

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
const exists = (path, callback) => {
  new Promise((resolve, reject) => resolve(getFile(sanitizePath)))
    .then(result => {
      callback(null, result);
    })
    .catch(error => callback(error, null));
};

const existsSync = path => {
  const f = getFile(sanitizePath(path));
  return f.exists();
};

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

const futimes = (fd, atime, mtime, callback) => {};

const futimesSync = (fd, atime, mtime) => {};

const lchmod = (path, mode, callback) => {};

const lchmodSync = (path, mode) => {};

const lchown = (path, uid, gid, callback) => {};

const lchownSync = (path, uid, gid) => {};

const link = (existingPath, newPath, callback) => {};

const linkSync = (existingPath, newPath) => {};

const lstat = (path, options, callback) => {};

const lstatSync = (path, options) => {};

const mkdir = (path, options, callback) =>
  callbackify(mkdirSync, callback, path, options);

const mkdirSync = (path, options) => getFile(sanitizePath(path)).mkdirs();

const mkdtemp = (prefix, options, callback) => {};

const mkdtempSync = (prefix, options) => {};

const open = (path, flags, mode, callback) => {};

const openSync = (path, flags, mode) => {};

const opendir = (path, options, callback) => {};

const opendirSync = (path, options) => {};

const _read = (fd, buffer, offset, length, position, callback) =>
  callbackify(
    readSync,
    callback,
    fd,
    buffer,
    offset,
    length,
    position,
    callback
  );

const readSync = (fd, buffer, offset, length, position) => read(fd);

const readdir = (path, options, callback) => {
  (async () => {
    try {
      const directory = await async.evaluateAsync(resolve =>
        resolve(getFile(sanitizePath))
      );
      if (!directory.isDirectory()) {
        throw 'Path must be a filename: ' + path;
      }
      const dirContents = directory.listFiles();
      const files = await async.evaluateAsync(resolve =>
        resolve(
          [...dirContents]
            .filter(file => file.isFile())
            .map(file => file.getName())
        )
      );
      callback(null, files);
    } catch (err) {
      callback(err, null);
    }
  })();
};

const readdirSync = (path, options) => {
  const directory = getFile(sanitizePath(path));
  if (!directory.isDirectory()) {
    throw 'Path must be a filename: ' + path;
  }
  const dirContents = directory.listFiles();
  return [...dirContents]
    .filter(file => file.isFile())
    .map(file => file.getName());
};

const readFile = (path, options, callback) =>
  callbackify(readFileSync, callback, path, options);

const readFileSync = (path, options) => read(sanitizePath(path));

const readlink = (path, options, callback) => {};

const readlinkSync = (path, options) => {};

const realpath = (path, options, callback) => {};

realpath.native = (path, options, callback) => {};

const realpathSync = (path, options) =>
  _path.resolve(process.cwd(), sanitizePath(path));

realpathSync.native = (path, options) => {};

const rename = (oldPath, newPath, callback) =>
  callbackify(renameSync, callback, oldPath, newPath);

const renameSync = (oldPath, newPath) => {
  const oldf = getFile(sanitizePath(oldPath));
  const newf = getFile(sanitizePath(newPath));
  return oldf.renameTo(newf);
};

const rmdir = (path, options, callback) =>
  callbackify(rmdirSync, callback, path, options);

const rmdirSync = (path, options) => {
  const f = getFile(sanitizePath(path));
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

const stat = (path, options, callback) =>
  callbackify(statSync, callback, path, options);

const statSync = (path, options) => {
  const f = getFile(sanitizePath(path));
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

const symlink = (target, path, type, callback) => {};

const symlinkSync = (target, path, type) => {};

const truncate = (path, len, callback) => {};

const truncateSync = (path, len) => {};

const unlink = (path, callback) => {};

const unlinkSync = path => {};

const unwatchFile = (filename, listener) => {};

const utimes = (path, atime, mtime, callback) => {};

const utimesSync = (path, atime, mtime) => {};

const watch = (filename, options, listener) => {};

const watchFile = (filename, options, listener) => {};

const write = (fd, content, offset, length, callback) =>
  callbackify(writeSync, callback, fd, content, offset, length);

const writeSync = (fd, content, offset, length) => {
  if (typeof content === 'string') {
    writeStringToFile(sanitizePath(fd), content, offset, 'UTF8'); // TODO: implement length
  } else {
    // writeBufferToFile(sanitizePath(fd), content, offset, 'UTF8');
  }
};

const writeFile = (file, data, options, callback) =>
  callbackify(writeFileSync, callback, file, data, options);

const writeFileSync = (file, data, options) => {
  writeStringToFile(sanitizePath(file), data, 0, 'UTF8');
};

const writev = (fd, buffers, position, callback) => {};

const writevSync = (fd, buffers, position) => {};

module.exports = {
  access,
  accessSync,
  appendFile,
  appendFileSync,
  chmod,
  chmodSync,
  chown,
  chownSync,
  close,
  closeSync,
  copyFile,
  copyFileSync,
  exists,
  existsSync,
  fchmod,
  fchmodSync,
  fchown,
  fchownSync,
  fdatasync,
  fdatasyncSync,
  fstat,
  fstatSync,
  fsync,
  fsyncSync,
  ftruncate,
  ftruncateSync,
  futimes,
  futimesSync,
  lchmod,
  lchmodSync,
  lchown,
  lchownSync,
  link,
  linkSync,
  lstat,
  lstatSync,
  mkdir,
  mkdirSync,
  mkdtemp,
  mkdtempSync,
  open,
  openSync,
  opendir,
  opendirSync,
  read,
  readSync,
  readdir,
  readdirSync,
  readFile,
  readFileSync,
  readlink,
  readlinkSync,
  realpath,
  realpathSync,
  rename,
  renameSync,
  rmdir,
  rmdirSync,
  stat,
  statSync,
  symlink,
  symlinkSync,
  truncate,
  truncateSync,
  unlink,
  unlinkSync,
  unwatchFile,
  utimes,
  utimesSync,
  watch,
  watchFile,
  write,
  writeSync,
  writeFile,
  writeFileSync,
  writev,
  writevSync
};
