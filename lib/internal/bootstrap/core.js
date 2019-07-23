const Module = require('module');
const errors = require('errors');

function initializeCore() {
  console.debug('Bootstrapping core library');
  if (!process.mainModule) {
    throw new errors.ERR_INVALID_RETURN_VALUE(
      'process.config["main"]',
      process.mainModule,
      'package.main must set an entry point'
    );
  }
  // make sure everything is taken care of before this. Once we hit this, init must be done.
  Module.runMain();
}

initializeCore();
