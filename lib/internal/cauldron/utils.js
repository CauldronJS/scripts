const semver = require('semver');

function spreadToGlobal(obj) {
  Object.defineProperties(
    globalThis || global,
    Object.getOwnPropertyDescriptors(obj)
  );
}

function since(minVersion) {
  return semver.gte(minVersion, process.env.BUKKIT_VERSION);
}

function getErrorStack(error) {
  let result = '';
  const stack = error.getStackTrace();
  for (let i = 0; i < stack.length; ++i) {
    const s = stack[i].toString();
    if (s.indexOf('oracle') > 0 || s.indexOf('graalvm') > 0) continue;
    result += `\n\t${stack[i]}`;
  }

  return result;
}

module.exports = {
  spreadToGlobal,
  since,
  getErrorStack
};
