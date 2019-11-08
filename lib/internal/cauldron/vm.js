const cauldronTypes = require('internal/cauldron/types');
const modules = require('internal/cauldron/modules');

function build() {
  // define new global types
  Object.defineProperties(
    global,
    Object.getOwnPropertyDescriptors(cauldronTypes)
  );
}

function getProcessVariables() {
  return {};
}

function requireForPlatform(request) {
  // eslint-disable-next-line global-require
  return require(`internal/cauldron/platform/${
    process.config.variables.platform
  }/${request}`);
}

module.exports = {
  build,
  getProcessVariables,
  modules,
  requireForPlatform
};
