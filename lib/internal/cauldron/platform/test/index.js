function Cauldron() {
  globalThis.require = require;
  globalThis.module = module;
  console.debug('Bootstrapping testing library');
  return false;
}

module.exports = Cauldron;
