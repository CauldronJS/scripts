// each player is tied to a profile, meaning all of their plots are stored here.
import store from '@cauldronjs/store';
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
  saveProfile(profile);
  return profile;
}

/**
 *
 * @param {string} uuid
 * @param {{x: Number, z: Number, world: string}} coords
 */
export function canClaim(uuid, coords) {
  const profile = getProfileFor(uuid);
  if (profile.claims.length === 0) return true;
  if (profile.claimsAllowed < profile.claims.length) return false;
  return (
    profile.claims.filter(
      (claim) => distance(coords, claim) <= 1 && claim.world === coords.world
    ).length > 0
  );
}

/**
 *
 * @param {string} uuid
 * @param {{x: Number, z: Number, world: string}} coords
 */
export function doesOwn(uuid, coords) {
  const profile = getProfileFor(uuid);
  return profile.claims.indexOf(coords) > -1;
}

/**
 *
 * @param {string} uuid
 * @param {{x: Number, z: Number, world: string}} coords
 */
export function claim(uuid, coords) {
  const profile = getProfileFor(uuid);
  profile.claims.push(coords);
  saveProfile(profile);
}

export function unclaim(uuid, coords) {
  const profile = getProfileFor(uuid);
  profile.claims = profile.claims.filter(
    (c) => c.x !== coords.x && c.z !== coords.z && c.world !== coords.world
  );
  saveProfile(profile);
}

/**
 *
 * @param {string} uuid
 *
 * @returns {{x: Number, z: Number, world: string}[]}
 */
export function unclaimAll(uuid) {
  const profile = getProfileFor(uuid);
  const unclaimed = profile.claims.slice(0);
  profile.claims = [];
  saveProfile(profile);
  return unclaimed;
}

export function commitProfiles() {
  setProfileStore(profileStore);
}

/**
 *
 * @param {Profile} claim
 * @param {string} memberId
 */
export function addMember(claim, memberId) {
  claim.members.push(memberId);
  saveProfile(claim);
}

/**
 *
 * @param {Profile} claim
 * @param {string} memberId
 */
export function removeMember(claim, memberId) {
  if (claim.members.indexOf(memberId) === -1) {
    throw new Error("That player isn't a member");
  }
  claim.members.splice(memberId);
  saveProfile(claim);
}

function saveProfile(profile) {
  setProfileStore({ [profile.owner]: profile });
}

const distance = (coord1, coord2) =>
  Math.sqrt(
    Math.pow(coord1.x - coord2.x, 2) + Math.pow(coord1.z - coord2.z, 2)
  );

class Profile {
  get claimsAllowed() {
    return (this.members.length + 1) * 10 + this.bonusClaims;
  }

  constructor(owner) {
    this.owner = owner;
    this.claims = [];
    this.members = [];
    this.rules = CLAIM_DEFAULTS;
    this.bonusClaims = 0;
  }
}

export const CLAIM_OPTIONS = {
  TNT: 'tnt',
  BLOCK_BREAK: 'block_break',
  BLOCK_PLACE: 'block_place',
  USE: 'use',
  PVP: 'pvp',
  PVMOB: 'pvmob',
  PVANIMAL: 'pvanimal',
};

export const CLAIM_DEFAULTS = {
  [CLAIM_OPTIONS.TNT]: false,
  [CLAIM_OPTIONS.BLOCK_BREAK]: false,
  [CLAIM_OPTIONS.BLOCK_PLACE]: false,
  [CLAIM_OPTIONS.USE]: false,
  [CLAIM_OPTIONS.PVP]: false,
  [CLAIM_OPTIONS.PVMOB]: false,
  [CLAIM_OPTIONS.PVANIMAL]: true,
};
