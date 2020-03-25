const fs = require('fs');

function getProcessVariables() {
  const dotenv = fs.readFileSync('.env');
  return JSON.parse(dotenv.toString());
}

function platform(filename) {
  // eslint-disable-next-line global-require
  return require(`internal/cauldron/platform/${$$cauldron$$
    .getTarget()
    .getPlatform()}/${filename}`);
}

module.exports = {
  getProcessVariables,
  platform
};
