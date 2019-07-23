const Paths = require('@java/java.nio.file.Paths');

function spawnSync(command, options = {}) {
  const result = __cauldron__.runProcess(
    command,
    Paths.get(options.dir || process.cwd()).toFile()
  );
  return { output: result.split('\n').filter(line => line && line.length > 0) };
}

function spawn(command, args, options) {}

module.exports = {
  spawnSync,
  spawn
};
