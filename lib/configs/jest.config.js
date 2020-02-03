const { defaults } = require('jest-config');

module.exports = {
  ...defaults,
  verbose: true,
  bail: 1,
  displayName: {
    name: 'CAULDRON_SRC',
    color: 'blue'
  },
  modules: ['internal', './'],
  extensions: ['js', 'jsx']
};
