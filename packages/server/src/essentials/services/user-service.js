import { Bukkit } from 'bukkit';

export function getPlayerFromName(name, allowOffline = false) {
  return (
    Bukkit.getPlayer(name) ||
    Bukkit.getPlayerExact(name) ||
    (allowOffline && Bukkit.getOfflinePlayer(name))
  );
}
