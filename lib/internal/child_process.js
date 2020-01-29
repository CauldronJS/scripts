const Spawn = require('de.mxro.process.Spawn');
const path = require('path');

function spawnSync(command, options = {}) {
  const dir = path.resolve(
    $$cauldron$$.getDataFolder().getPath(),
    options.dir || ''
  );
  const result = Spawn.sh(dir, command);
  return { output: result.split('\n').filter(line => line && line.length > 0) };
}

function spawn(command, args, options) {}

module.exports = {
  spawnSync,
  spawn
};
