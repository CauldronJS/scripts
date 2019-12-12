// this file will fire before any other non-internal modules are loaded

const cauldronGlobals = require('internal/cauldron/globals');
const { platform } = require('internal/cauldron/vm');
const { spreadToGlobal } = require('internal/cauldron/utils');

const platformGlobals = platform('globals');

function sanitizeGlobal() {
  spreadToGlobal(cauldronGlobals);
  spreadToGlobal(platformGlobals);
}

module.exports = {
  sanitizeGlobal
};
