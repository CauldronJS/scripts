const ProcessBuilder = require('@java/java.lang.ProcessBuilder');
const Paths = require('@java/java.nio.file.Paths');
const Runtime = require('@java/java.lang.Runtime');

const runtime = Runtime.getRuntime();

function spawnSync(command, args = [], options = {}) {
  const proc = runtime.exec(
    command,
    args,
    Paths.get(options.dir || process.cwd()).toFile()
  );
  return proc.waitFor();
}

function spawn(command, args, options) {}

module.exports = {
  spawnSync,
  spawn
};
