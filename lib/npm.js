const { spawnSync } = require('child_process');

exports.runScript = (scripts, scriptName, dir) => {
  if (!scripts) {
    return false;
  }
  const script = scripts[scriptName];
  if (!script || script.length === 0) {
    return false;
  }
  try {
    // TODO: implement node_modules/.bin
    const spawned = spawnSync(script, {
      dir
    });
    // TODO: process exitValue
    return spawned;
  } catch (err) {
    console.error(`An error occured running ${scriptName}: ${err}`);
    return false;
  }
};
