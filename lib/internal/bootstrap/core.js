/**
 * bootstrap/core.js
 * ============
 * This file is in charge of loading the internal modules. After the loading of the core
 * files is complete, this file is also in charge of removing the internal modules from
 * reference.
 */

const Module = require('module');
const errors = require('errors');
const { spawnSync } = require('child_process');

function initializeCore() {
  if (!process.mainModule) {
    throw new errors.ERR_INVALID_RETURN_VALUE(
      'process.config["main"]',
      process.mainModule,
      'package.main must set an entry point'
    );
  }
  __cauldron__.on('ON_DISABLE', () => {
    runScript('stop');
  });
  runScript('prestart');
  // make sure everything is taken care of before this. Once we hit this, init must be done.
  Module.runMain();
}

function runScript(name) {
  const script = process.config.scripts[name];
  if (!script || script.length === 0) return false;
  const spawned = spawnSync(script);
  return spawned;
}

initializeCore();
