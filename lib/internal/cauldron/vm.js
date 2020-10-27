const fs = require('fs');
const http_parser = require('internal/http_parser');

const modules = {
  http_parser,
};

function getProcessVariables() {
  return $$isolate$$.getEnvVars();
}

function platform(filename) {
  // eslint-disable-next-line global-require
  return require(`internal/cauldron/platform/${$$cauldron$$
    .getTarget()
    .getPlatform()}/${filename}`);
}

module.exports = {
  getProcessVariables,
  platform,
  modules,
};
