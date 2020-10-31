import { events } from 'cauldronjs';
import useStore from '@cauldronjs/store';
import { locationToString, stringToLocation } from '../../utils';

const [homeProfiles, setHomeProfiles] = useStore('essentials-homes', {});

class Home {
  /**
   *
   * @param {string} name
   * @param {string} world
   * @param {number} x
   * @param {number} y
   * @param {number} z
   */
  constructor(name, world, x, y, z) {
    this.name = name;
    this.world = world;
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

class HomeProfile {
  /**
   *
   * @param {string} owner
   * @param  {...Home} homes
   */
  constructor(owner, ...homes) {
    this.owner = owner;
    this.homes = homes;
  }
}

/**
 *
 * @param {import('bukkit/entity').Player} player
 *
 * @returns {Home[]}
 */
export function getHomeProfile(player) {
  return homeProfiles[player.getUniqueId().toString()] || [];
}

/**
 *
 * @param {import('bukkit/entity').Player} player
 * @param {string} name
 * @param {import('bukkit').Location} location
 */
export function addHome(player, name, location) {
  const homes = getHomeProfile(player);
  if (homes.find((home) => home.name === name)) {
    throw new Error('A home with that name already exists');
  }
  homes.push(
    new Home(
      name,
      location.getWorld().getName(),
      location.getBlockX(),
      location.getBlockY(),
      location.getBlockZ()
    )
  );
  setHomeProfiles({ [player.getUniqueId().toString()]: homes });
}

/**
 *
 * @param {import('bukkit/entity').Player} player
 */
export function deleteHome(player, name) {
  const homes = getHomeProfile(player).filter((home) => home.name !== name);
  setHomeProfiles({ [player.getUniqueId().toString()]: homes });
}
