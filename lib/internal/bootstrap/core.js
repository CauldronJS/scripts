globalThis.Buffer = require('buffer');
const Module = require('module');
const cauldronApi = require('cauldron');

function initializeCore() {
  console.debug('Bootstrapping core library');
  if (!process.mainModule) {
    throw new Error('package.main must set an entry point');
  }
  // make sure everything is taken care of before this. Once we hit this, init must be done.
  console.debug('Running script "start"');
  Module.runScript(process.config.variables.scripts, 'start');
  // loadDependencies();
  console.debug('Initializing Cauldron JS API');
  cauldronApi();
  console.debug('Running main module');
  Module.runMain();
}

initializeCore();
