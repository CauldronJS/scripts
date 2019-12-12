const modules = require('internal/cauldron/modules');
const fs = require('fs');

function getProcessVariables() {
  const dotenv = fs.readFileSync('.env');
  return JSON.parse(dotenv.toString());
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
