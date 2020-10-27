const pathToNamespace = (path) => path.replace(/[\\/]/g, '.');
const scriptRunner = internalBinding('ScriptRunner');

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
      return scriptRunner.runScript(pathedName, 'internal/resolvers/java.js');
    }
  },
};
