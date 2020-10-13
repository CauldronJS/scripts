import { Bukkit } from 'bukkit';
import { getName, getUuid } from '@cauldronjs/players';
import { getClaimFor } from './claim';

export const getChunkCoordsForEntity = (entity) => {
  const playerCoords = entity.getLocation().toVector();
  const x = Math.floor(playerCoords.getX() / 16);
  const z = Math.floor(playerCoords.getZ() / 16);
  const world = entity.getWorld().getName();
  return { x, z, world };
};

export const getChunkCoordsFromArgs = (caller, x, z) => {
  if (!x || !z) {
    throw new Error(`Expected <x> <z> but got either one or none`);
  }
  const world = caller.getLocation().getWorld().getName();
  if (isNaN(x) || isNaN(z)) {
    throw new Error(`Invalid coordinates passed: ${x},${z}`);
  }
  return { x, z, world };
};

export const getPlayerList = (sender) =>
  [...Bukkit.getOfflinePlayers()].filter(
    (p) => p.getName() !== sender?.getName()
  );

export const getPlayerByName = getUuid;

export const getMembersList = (sender) => {
  const coords = getChunkCoordsForEntity(sender);
  const claim = getClaimFor(coords);
  return claim.residents.map(getName);
};

export const getWorldNames = () =>
  [...Bukkit.getWorlds()].map((w) => w.getName());
