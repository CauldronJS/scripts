const javaResolver = require('internal/resolvers/java');

const SHORTHANDS = {
  bukkit(request) {
    return `org.${request}`;
  },
  spigotmc(request) {
    return `org.${request}`;
  },
  java(request) {
    return request;
  },
  bungee(request) {
    return `net.md_5.${request}`;
  },
};

module.exports = {
  /**
   *
   * @param {string} id
   */
  test(id) {
    const root = id.split(/\.|\\|\//)[0].toLowerCase();
    return SHORTHANDS[root];
  },
  /**
   *
   * @param {string} id
   * @param {*} testResult
   */
  process(id, testResult) {
    return javaResolver.process(`@java/${testResult(id)}`);
  },
};
