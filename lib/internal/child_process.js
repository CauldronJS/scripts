const Paths = require('@java/java.nio.file.Paths');
const Runtime = require('@java/java.lang.Runtime');
const os = require('internal/os');
const { getStringFromBuffer } = require('internal/util');

const runtime = Runtime.getRuntime();
const shell = os.platform() === 'win32' ? 'cmd.exe' : 'bash';

function spawnSync(command, options = {}) {
  const result = __cauldron__.runProcess(
    command,
    Paths.get(options.dir || process.cwd()).toFile()
  );
  console.debug(result);
}

function spawn(command, args, options) {}

module.exports = {
  spawnSync,
  spawn
};
