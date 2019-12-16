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
