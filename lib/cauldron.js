const cauldron = require('internal/cauldron/bootstrap');

cauldron.sanitizeGlobal();

module.exports = cauldron.entry;
