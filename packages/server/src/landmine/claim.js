import store from '@cauldron/store';

const [claimStore, setClaimStore] = store('landmine_claims', {});

const coordsToKey = coords => `${coords.x},${coords.z},${coords.world}`;

/**
 *
 * @param  {...{x: Number, z: Number, world: string}} coords
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
 * @param {{x: Number, z: Number, world: string}} coords
 *
 * @returns {LandClaim}
 */
export function getClaimFor(coords) {
  return claimStore[coordsToKey(coords)];
}

/**
 *
 * @param {{x: Number, z: Number, world: string}} coords
 * @param {string} owner
 *
 * @returns {LandClaim}
 */
export function createClaim(coords, owner) {
  const claim = new LandClaim(owner);
  setClaimStore({ [coordsToKey(coords)]: claim });
  return claim;
}

/**
 *
 * @param {{x: Number, z: Number, world: string}} coords
 *
 * @returns {boolean}
 */
export function isClaimable(coords) {
  return !claimStore[coordsToKey(coords)];
}

/**
 *
 * @param {{x: Number, z: Number, world: string}[]} coords
 */
export function removeClaims(...coords) {
  coords.forEach(coord => (claimStore[coordsToKey(coord)] = undefined));
  setClaimStore(claimStore);
}

export function isResident(coords, uuid) {
  const claim = getClaimFor(coords);
  return claim.residents.indexOf(uuid) > -1;
}

export class LandClaim {
  /**
   *
   * @param {string} owner
   */
  constructor(owner) {
    this.owner = owner;
    this.residents = [];
  }
}
