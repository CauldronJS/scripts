function spawnSync(command, options = {}) {
  const result = $$isolate$$.spawn(command, options.dir || './');
  return { output: result.split('\n').filter(line => line && line.length > 0) };
}

function spawn(command, args, options) {}

module.exports = {
  spawnSync,
  spawn
};
