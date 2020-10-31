import { Bukkit, Location } from 'bukkit';

/**
 *
 * @param {import('bukkit').Location} location
 *
 * @returns {string}
 */
export function locationToString(location) {
  return `${location.getX()},${location.getY()},${location.getZ()},${location.getWorld()}`;
}

/**
 *
 * @param {string} input
 *
 * @returns {import('bukkit').Location}
 */
export function stringToLocation(input) {
  const [x, y, z, worldName] = input.split(',');
  const world = Bukkit.getWorld(worldName);
  if (!world) {
    throw new Error(`A world with the name ${worldName} doesn't exist`);
  }
  return new Location(world, x, y, z);
}
