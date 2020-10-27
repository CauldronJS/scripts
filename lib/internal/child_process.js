const processManager = internalBinding('ProcessManager');

function spawnSync(command, args, options = {}) {
  const result = processManager.spawnSync(command, args, options);
  return {
    output: result.split('\n').filter((line) => line && line.length > 0),
  };
}

function spawn(command, args, options) {}

module.exports = {
  spawnSync,
  spawn,
};
