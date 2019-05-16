const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const globalInstallDir = spawnSync('npm root').output;

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

function findInstalledModule(currentDir, moduleName) {
  // for this whole function, we're assuming 'currentDir' is not pointing to a filename
  let dir = path.resolve(currentDir, 'deps', moduleName);
  if (fs.existsSync(dir)) {
    return dir;
  }
  dir = path.resolve(currentDir, 'node_modules', moduleName);
  if (fs.existsSync(dir)) {
    return dir;
  }
  const parentDir = path.resolve(currentDir, '..');
  if (parentDir === currentDir || !parentDir || parentDir.length === 0) {
    // lets check global at least
    dir = path.resolve(globalInstallDir, moduleName);
    if (fs.existsSync(dir)) {
      return dir;
    } else {
      return null;
    }
  } else {
    return findInstalledModule(parentDir, moduleName);
  }
}

exports.findInstalledModule = findInstalledModule;
