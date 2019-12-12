const api = require('internal/cauldron/api');

const impl = require(`internal/cauldron/platform/${
  process.config.variables.plat
}`);

const build = () => {
  const cauldronPrototype = { ...api, ...impl };
  if (cauldronPrototype.constructor) {
    // this is a class
    Object.defineProperty(this, 'prototype', {
      get() {
        return cauldronPrototype;
      }
    });
  } else {
   // pass as args or accessible to 'this'
  }
};

module.exports = build;