const pathToNamespace = path => path.replace(/\\\//g, '.');

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
    try {
      return Java.type(id);
    } catch (err) {
      return $$cauldron$$
        .isolate()
        .runScript(
          `Packages.${pathToNamespace(id.split('@java/')[1])}`,
          'internal/resolvers/java.js'
        );
    }
  }
};
