const modules = require('internal/cauldron/modules');
const fs = require('fs');

function getProcessVariables() {
  const dotenv = fs.readFileSync('.env');
  return JSON.parse(dotenv.toString());
}

module.exports = {
  getProcessVariables,
  modules
};
