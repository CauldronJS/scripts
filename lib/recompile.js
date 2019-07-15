const useStore = require('store');

// This library is strictly to be used by Cauldron
// but it needs to be injested by the core module
// loader, hence why it's not a @cauldron library.

const [cache, setCache] = useStore('recompile');

function getDirectoryHash(dirname) {
  return null;
}

function recompile(targetModule) {
  const previousHash = cache[moduleName];
  const currentHash = getDirectoryHash(targetModule.__dirname);
}

module.exports = recompile;
