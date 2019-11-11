// this file will fire before any other non-internal modules are loaded

const cauldronGlobals = require('internal/cauldron/globals');
const { requireForPlatform } = require('internal/cauldron/vm');
const { spreadToGlobal } = require('internal/cauldron/utils');

const platformGlobals = requireForPlatform('globals');

function sanitizeGlobal() {
  spreadToGlobal(cauldronGlobals);
  spreadToGlobal(platformGlobals);
}

module.exports = {
  sanitizeGlobal
};
