const api = require('./api');
const impl = require('@cauldron/spigot');

for (const field in api) {
  if (!impl[field]) {
    impl[field] = api[field];
  }
}
