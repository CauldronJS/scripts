// platform agnostic globals go here
const isolate = globalThis.$$cauldron$$.isolate;

function internalBinding(id) {
  return Isolate
    .getModuleManager()
    .getInternalModule(id);
}

module.exports = {
  internalBinding
};
