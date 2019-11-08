const api = require('internal/cauldron/api');

const impl = require(`internal/cauldron/platform/${
  process.config.variables.plat
}`);
