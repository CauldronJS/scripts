const pathToNamespace = path => path.replace(/[\\/]/g, '.');

module.exports = {
  /**
   *
   * @param {string} id
   */
  test(id) {
    return id.startsWith('@java/');
  },
  /**
   *
   * @param {string} id
   * @param {*} testResult
   */
  process(id, testResult) {
    const pathedName = `Packages.${pathToNamespace(
      pathToNamespace(id.replace(/^@java\//, ''))
    )}`;
    try {
      return Java.type(id);
    } catch (err) {
      return $$cauldron$$
        .getMainIsolate()
        .runScript(pathedName, 'internal/resolvers/java.js');
    }
  }
};
