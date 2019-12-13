const semver = require('semver');

function spreadToGlobal(obj) {
  Object.defineProperties(global, Object.getOwnPropertyDescriptors(obj));
}

function since(minVersion) {
  return semver.gte(minVersion, process.env.BUKKIT_VERSION);
}

module.exports = {
  spreadToGlobal,
  since
};
