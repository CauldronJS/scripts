function spreadToGlobal(obj) {
  Object.defineProperties(global, Object.getOwnPropertyDescriptors(obj));
}

module.exports = {
  spreadToGlobal
};
