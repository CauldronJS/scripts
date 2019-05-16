const {
  CHAR_LINE_FEED,
  CHAR_CARRIAGE_RETURN,
  CHAR_EXCLAMATION_MARK,
  CHAR_HASH
} = require('internal/constants');
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const stripBOM = content => {
  if (content.charCodeAt(0) === 0xfeff) {
    content = content.slice(1);
  }
  return content;
};

const stripShebang = content => {
  const contLen = content.length;
  if (contLen >= 2) {
    if (
      content.charCodeAt(0) === CHAR_HASH &&
      content.charCodeAt(1) === CHAR_EXCLAMATION_MARK
    ) {
      if (contLen === 2) {
        content = '';
      } else {
        let i = 2;
        for (; i < contLen; ++i) {
          const code = content.charCodeAt(i);
          if (code === CHAR_LINE_FEED || code === CHAR_CARRIAGE_RETURN) {
            break;
          }
        }
        if (i === contLen) {
          content = '';
        } else {
          content = content.slice(i);
        }
      }
    }
  }
  return content;
};

const globalInstallDir = spawnSync('npm root').output;

const runScript = (scripts, scriptName, dir) => {
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

const findInstalledModule = (currentDir, moduleName) => {
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
};

exports.findInstalledModule = findInstalledModule;

module.exports = {
  stripBOM,
  stripShebang,
  runScript,
  findInstalledModule
};
