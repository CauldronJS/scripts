const modules = require('internal/cauldron/modules');

function getProcessVariables() {
  return {};
}

function platform(request) {
  // eslint-disable-next-line global-require
  return require(`internal/cauldron/platform/${
    process.config.variables.platform
  }/${request}`);
}

module.exports = {
  getProcessVariables,
  modules,
  platform
};
