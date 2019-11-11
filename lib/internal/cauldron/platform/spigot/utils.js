const { NamespacedKey } = require('bukkit');

const getPlugin = name =>
  Bukkit.getPluginManager().getPlugin(name || 'Cauldron');

const isWildcardPermission = permission => /^(\w+\.)*\*$/gi.test(permission);

const NAMESPACE_KEY = new NamespacedKey(__cauldron__, 'cauldron');

module.exports = {
  getPlugin,
  isWildcardPermission,
  NAMESPACE_KEY
};
