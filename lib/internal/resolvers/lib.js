const javaResolver = require('internal/resolvers/java');

module.exports = {
  /**
   *
   * @param {string} id
   */
  test(id) {
    return id.startsWith('@lib/');
  },
  /**
   *
   * @param {string} id
   * @param {*} testResult
   */
  process(id, testResult) {
    return javaResolver.process(`com.cauldronjs.libs.${id}`, testResult);
  }
};
