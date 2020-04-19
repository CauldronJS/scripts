// each player is tied to a profile, meaning all of their plots are stored here.
import store from '@cauldron/store';
import { LandClaim } from './claim';

const [profileStore, setProfileStore] = store('landmine_profiles', {});

/**
 *
 * @param {string} uuid
 *
 * @returns {Profile}
 */
export function getProfileFor(uuid) {
  if (typeof uuid !== 'string') {
    uuid = uuid.toString();
  }
  if (profileStore[uuid]) {
    return profileStore[uuid];
  }

  const profile = new Profile(uuid);
  setProfileStore({ ...profileStore, [uuid]: profile });
  return profile;
}

/**
 *
 * @param {string} uuid
 * @param {{x: Number, z: Number}} coords
 */
export function canClaim(uuid, coords) {
  const profile = getProfileFor(uuid);
  if (profile.claimsAllowed > profile.claims.length) return true;
  return (
    profile.claims.filter(claim => distance(coords, claim.coords) <= 1).length >
    0
  );
}

/**
 *
 * @param {string} uuid
 * @param {LandClaim} claim
 */
export function claim(uuid, claim) {
  const profile = getProfileFor(uuid);
  profile.claims.push(claim.coords);
  setProfileStore({ ...profileStore, [uuid]: profile });
}

export function unclaim(uuid, coords) {
  const profile = getProfileFor(uuid);
  profile.claims = profile.claims.filter(
    c => c.x !== coords.x && c.z !== coords.z
  );
  setProfileStore({ ...profileStore, [uuid]: profile });
}

/**
 *
 * @param {string} uuid
 *
 * @returns {{x: Number, z: Number}[]}
 */
export function unclaimAll(uuid) {
  const profile = getProfileFor(uuid);
  const unclaimed = profile.claims.slice(0);
  profile.claims = [];
  setProfileStore({ ...profileStore, [uuid]: profile });
  return unclaimed;
}

const distance = (coord1, coord2) =>
  Math.sqrt(Math.pow(coord1.x - coord2.x, 2) + Math.pow(coord1.z - coord2.z));

class Profile {
  constructor(uuid) {
    this.owner = uuid;
    this.claims = [];
    this.claimsAllowed = 10;
  }
}
