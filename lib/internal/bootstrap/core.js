const Module = require('module');
const errors = require('errors');
const { get } = require('util');

function initializeCore() {
  if (!process.mainModule) {
    throw new errors.ERR_INVALID_RETURN_VALUE(
      'process.config["main"]',
      process.mainModule,
      'package.main must set an entry point'
    );
  }
  Module.runScript(process.config.scripts, 'prestart');
  // make sure everything is taken care of before this. Once we hit this, init must be done.
  Module.runMain();
}

initializeCore();
