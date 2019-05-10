const system = java.lang.System;

const is64Bit = system.getProperty('sun.arch.data.model') == '64';
const jvmVersion = system.getProperty('java.version');
const osName = system.getProperty('os.name');
const runtime = java.lang.Runtime.getRuntime();

const EOL = isWindows() ? '\r\n' : '\n';

function isOSX() {
  return osName.startsWith('Mac OS X');
}

function isWindows() {
  return osName.startsWith('Windows');
}

function isLinux() {
  return osName.startsWith('Linux');
}

function isSunOS() {
  return osName.startsWith('SunOS');
}

function isFreeBSD() {
  return osName.startsWith('FreeBSD');
}

function isOpenBSD() {
  return osName.startsWith('OpenBSD');
}

function arch() {}

const constants = {};

function cpus() {
  return runtime.availableProcessors();
}

function endianness() {
  return 'BE';
}

function freemem() {
  return runtime.freeMemory();
}

function homedir() {
  return system.getProperty('user.home');
}

function hostname() {
  return java.net.InetAddress.getLocalHost().getHostName();
}

function loadavg() {}

function networkInterfaces() {}

function release() {}

function tmpdir() {
  return system.getProperty('java.io.tmpdir');
}

function totalmem() {
  return runtime.totalMemory();
}

function type() {}

function uptime() {}

function userInfo(options) {}

function platform() {
  if (isOSX()) {
    return 'darwin';
  }
  if (isWindows()) {
    return 'win32';
  }
  if (isLinux()) {
    return 'linux';
  }
  if (isSunOS()) {
    return 'sunos';
  }
  if (isFreeBSD()) {
    return 'freebsd';
  }
  if (isOpenBSD()) {
    return 'openbsd';
  }
  throw 'Could not determine OS platform';
}

module.exports = {
  is64Bit,
  jvmVersion,
  platform,
  EOL,
  arch,
  constants,
  cpus,
  endianness,
  freemem,
  homedir,
  hostname,
  loadavg,
  networkInterfaces,
  release,
  tmpdir,
  totalmem,
  type,
  uptime,
  userInfo
};
