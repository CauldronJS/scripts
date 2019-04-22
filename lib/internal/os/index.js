const system = require('@java/java.lang.System');

const is64Bit = system.getProperty('sun.arch.data.model') === '64';
const jvmVersion = system.getProperty('java.version');
const osName = system.getProperty('os.name');

function isOSX () {
  return osName.startsWith('Mac OS X');
}

function isWindows () {
  return osName.startsWith('Windows');
}

function isLinux () {
  return osName.startsWith('Linux');
}

function isSunOS () {
  return osName.startsWith('SunOS');
}

function isFreeBSD () {
  return osName.startsWith('FreeBSD');
}

function isOpenBSD () {
  return osName.startsWith('OpenBSD');
}

var platform = function () {
  if (isOSX()) return 'darwin';
  if (isWindows()) return 'win32';
  if (isLinux()) return 'linux';
  if (isSunOS()) return 'sunos';
  if (isFreeBSD()) return 'freebsd';
  if (isOpenBSD()) return 'openbsd';
  throw new Error('Could not determine OS platform');
};

module.exports = {
  is64Bit,
  jvmVersion,
  platform
};
