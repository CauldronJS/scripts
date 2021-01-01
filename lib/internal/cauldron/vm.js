const fs = require('fs');
const http_parser = require('internal/http_parser');

const modules = {
  http_parser,
};

function getProcessVariables() {
  return internalBinding('env_vars');
}

function platform(filename) {
  // eslint-disable-next-line global-require
  return require(`internal/cauldron/platform/${internalBinding(
    'target'
  ).getPlatform()}/${filename}`);
}

module.exports = {
  getProcessVariables,
  platform,
  modules,
};
