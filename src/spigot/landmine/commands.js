import Rinse, { Command } from '@cauldron/rinse';
import colors from '@cauldron/colors';
import {
  canClaim,
  claim,
  unclaim,
  unclaimAll,
  doesOwn,
  getProfileFor,
  commitProfiles,
  CLAIM_OPTIONS
} from './profile';
import { createClaim, isClaimable, removeClaims, getClaimFor } from './claim';
import { getChunkCoordsForEntity } from './utils';

function executeClaim({ sender }) {
  const uuid = sender.getUniqueId().toString();
  const coords = getChunkCoordsForEntity(sender);
  const profile = getProfileFor(uuid);
  if (profile.claimsAllowed <= profile.claims.length) {
    return colors.red("You don't have any claims left");
  }
  if (!canClaim(uuid, coords)) {
    return colors.red("This claim isn't connected to any previous claims");
  }
  if (!isClaimable(coords)) {
    return colors.red('This chunk has already been claimed');
  }
  createClaim(coords, uuid);
  claim(uuid, coords);

  return colors.green(`Claimed ${coords.x},${coords.z}`);
}

function executeUnclaim({ sender }) {
  const uuid = sender.getUniqueId().toString();
  const coords = getChunkCoordsForEntity(sender);
  try {
    if (getClaimFor(coords).owner !== uuid) {
      return colors.red("You don't own this chunk!");
    }
    unclaim(uuid, coords);
    removeClaims(coords);
    return colors.green(`Unclaimed ${coords.x},${coords.z}`);
  } catch (err) {
    return colors.red(`Failed to unclaim: ${err}`);
  }
}

function executeUnclaimAll({ sender }) {
  const uuid = sender.getUniqueId().toString();
  try {
    const unclaimed = unclaimAll(uuid);
    removeClaims(unclaimed);
    return colors.green(`Unclaimed ${unclaimed.length} chunks`);
  } catch (err) {
    return colors.red(`Failed to unclaim all: ${err}`);
  }
}

function executeMap({ sender }) {
  const uuid = sender.getUniqueId().toString();
  const coords = getChunkCoordsForEntity(sender);
}

function executeInfo({ sender }) {
  const coords = getChunkCoordsForEntity(sender);
  const claim = getClaimFor(coords);
  if (claim) {
    return colors.yellow('This chunk has already been claimed');
  } else {
    return colors.green('This chunk has not been claimed');
  }
}

function executeModify({ sender, args }) {
  const uuid = sender.getUniqueId().toString();
  const profile = getProfileFor(uuid);
  if (!profile) return colors.red('You have no claims to modify');
  for (const rule of args) {
    const name = rule.split('=')[0];
    if (Object.values(CLAIM_OPTIONS).indexOf(name) === -1) {
      sender.sendMessage(colors.red(`Unknown rule ${name}`));
      continue;
    }
    const value = (rule.split('=')[1] || 'allow').toLowerCase();
    if (value === 'allow' || value === 'true') {
      profile.rules[name] = true;
    } else if (value === 'deny' || value === 'false') {
      profile.rules[name] = false;
    } else {
      return colors.red(
        `Unknown value "${value}". Must be allow/deny/true/false`
      );
    }
  }

  commitProfiles();

  return colors.green('Successfully updated rules for all claims');
}

function executeMembersInfo({ sender }) {
  const uuid = sender.getUniqueId().toString();
  const profile = getProfileFor(uuid);
}

function executeMembersAdd({ sender }) {
  const uuid = sender.getUniqueId().toString();
  const profile = getProfileFor(uuid);
}

function executeMembersRemove({ sender }) {
  const uuid = sender.getUniqueId().toString();
  const profile = getProfileFor(uuid);
}

export const LandmineCommands = () => (
  <Command name="landmine" aliases={['lm']}>
    <Command name="claim" aliases={['c']} execute={executeClaim} />
    <Command
      name="unclaim"
      aliases={['delete', 'remove', 'r', 'u']}
      execute={executeUnclaim}
    >
      <Command name="all" execute={executeUnclaimAll} />
    </Command>
    <Command name="map" aliases={['m']} execute={executeMap} />
    <Command name="info" aliases={['i']} execute={executeInfo} />
    <Command name="modify" execute={executeModify} />
    <Command name="members" execute={executeMembersInfo}>
      <Command name="add" execute={executeMembersAdd} />
      <Command name="remove" execute={executeMembersRemove} />
    </Command>
  </Command>
);
