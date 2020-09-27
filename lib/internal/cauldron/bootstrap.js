// this file will fire before any other non-internal modules are loaded

const cauldronGlobals = require('internal/cauldron/globals');
const { platform } = require('internal/cauldron/vm');
const { spreadToGlobal } = require('internal/cauldron/utils');
const ServiceLoader = require('internal/cauldron/service-loader');

const platformGlobals = platform('globals');
const entry = platform('index');
entry.services = new ServiceLoader();

function sanitizeGlobal() {
  spreadToGlobal(cauldronGlobals);
  spreadToGlobal(platformGlobals);
}

module.exports = {
  sanitizeGlobal,
  entry,
};
