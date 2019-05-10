const Paths = require('@java/java.nio.file.Paths');
const Runtime = require('@java/java.lang.Runtime');
const os = require('internal/os');
const { getStringFromBuffer } = require('internal/util');

const runtime = Runtime.getRuntime();
const shell = os.platform() === 'win32' ? 'cmd.exe' : 'bash';

function spawnSync(command, args = [], options = {}) {
  const proc = runtime.exec(
    `${shell} ${command}`,
    args,
    Paths.get(options.dir || process.cwd()).toFile()
  );
  const output = getStringFromBuffer(proc.getInputStream());
  const error = getStringFromBuffer(proc.getErrorStream());
  proc.waitFor();
  proc.destroy();
  
}

function spawn(command, args, options) {}

module.exports = {
  spawnSync,
  spawn
};
