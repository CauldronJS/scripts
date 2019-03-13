const createCommand = require('internal/cauldron/commands');
const Alias = require('internal/cauldron/alias');
const { getPlugin } = require('internal/cauldron/utils');

if (!global.__cauldron__) {
  return;
}

const alias = Alias._create;

module.exports = {
  createCommand,
  getPlugin,
  alias
}