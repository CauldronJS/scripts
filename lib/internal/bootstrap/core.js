globalThis.Buffer = require('buffer');
const Module = require('module');
const cauldronApi = require('cauldronjs');

function initializeCore() {
  console.debug('Bootstrapping core library');

  // make sure everything is taken care of before this. Once we hit this, init must be done.
  // console.debug('Running script "start"');
  // Module.runScript(process.config.variables.scripts, 'start');
  // loadDependencies();
  console.debug('Initializing Cauldron JS API');
  if (cauldronApi()) {
    if (!process.mainModule) {
      throw new Error('package.main must set an entry point');
    }
    console.debug('Running main module');
    Module.runMain();
  }
}

initializeCore(!process.env.CAULDRON_BLOCK_ENTRY);

module.exports = Module;
