import store from '@cauldron/store';

const [claimStore, setClaimStore] = store('landmine_claims', {});

const coordsToKey = coords => `${coords.x},${coords.z}`;

/**
 *
 * @param  {...{x: Number, z: Number}} coords
 *
 * @returns {LandClaim[]}
 */
export function getClaimsFor(...coords) {
  return coords.reduce(
    (claims, coord) => [...claims, claimStore[coordsToKey(coord)]],
    []
  );
}

/**
 *
 * @param {{x: Number, z: Number}} coords
 *
 * @returns {LandClaim}
 */
export function getClaimFor(coords) {
  return claimStore[coordsToKey(coords)];
}

/**
 *
 * @param {{x: Number, z: Number}} coords
 * @param {*} rules
 *
 * @returns {LandClaim}
 */
export function createClaim(coords, rules = CLAIM_DEFAULTS) {
  const claim = new LandClaim(coords, rules);
  setClaimStore({ ...claimStore, [coordsToKey(coords)]: claim });
  return claim;
}

/**
 *
 * @param {{x: Number, z: Number}} coords
 *
 * @returns {boolean}
 */
export function isClaimable(coords) {
  return !claimStore[coordsToKey(coords)];
}

/**
 *
 * @param {{x: Number, z: Number}[]} coords
 */
export function removeClaims(...coords) {
  coords.forEach(coord => delete claimStore[coordsToKey(coord)]);
  setClaimStore(claimStore);
}

export class LandClaim {
  constructor(chunkCoords, rules = CLAIM_DEFAULTS) {
    this.coords = chunkCoords;
    this.rules = rules;
  }
}

export const CLAIM_OPTIONS = {
  TNT: 'tnt',
  BLOCK_BREAK: 'block_break',
  BLOCK_PLACE: 'block_place',
  USE: 'use',
  PVP: 'pvp',
  PVMOB: 'pvmob',
  PVANIMAL: 'pvanimal'
};

export const CLAIM_DEFAULTS = {
  [CLAIM_OPTIONS.TNT]: false,
  [CLAIM_OPTIONS.BLOCK_BREAK]: false,
  [CLAIM_OPTIONS.BLOCK_PLACE]: false,
  [CLAIM_OPTIONS.USE]: false,
  [CLAIM_OPTIONS.PVP]: false,
  [CLAIM_OPTIONS.PVMOB]: false,
  [CLAIM_OPTIONS.PVANIMAL]: true
};
