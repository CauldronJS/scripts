import NamespacedKey from 'bukkit/NamespacedKey';

export const getPlugin = name =>
  Bukkit.getPluginManager().getPlugin(name || 'Cauldron');

export const isWildcardPermission = permission =>
  /^(\w+\.)*\*$/gi.test(permission);

export const NAMESPACE_KEY = new NamespacedKey(__cauldron__, 'cauldron');
