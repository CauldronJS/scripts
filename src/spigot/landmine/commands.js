import Rinse, { Command } from '@cauldron/rinse';
import colors from '@cauldron/colors';
import { canClaim, claim, unclaim, unclaimAll } from './profile';
import { createClaim, isClaimable, removeClaims, getClaimFor } from './claim';
import { getChunkCoordsForEntity } from './utils';

function executeClaim({ sender }) {
  const uuid = sender.getUniqueId().toString();
  const coords = getChunkCoordsForEntity(sender);
  if (!canClaim(uuid)) {
    return sender.sendMessage(colors.red("You don't have enough claims"));
  }
  if (!isClaimable(coords)) {
    return sender.sendMessage(
      colors.red('This chunk has already been claimed')
    );
  }
  const claimedChunk = createClaim(coords);
  claim(uuid, claimedChunk);

  return sender.sendMessage(colors.green(`Claimed ${coords.x},${coords.z}`));
}

function executeUnclaim({ sender }) {
  const uuid = sender.getUniqueId().toString();
  const coords = getChunkCoordsForEntity(sender);
  try {
    unclaim(uuid, coords);
    removeClaims(coords);
    return sender.sendMessage(
      colors.green(`Unclaimed ${coords.x},${coords.z}`)
    );
  } catch (err) {
    return sender.sendMessage(colors.red(`Failed to unclaim: ${err}`));
  }
}

function executeUnclaimAll({ sender }) {
  const uuid = sender.getUniqueId().toString();
  try {
    const unclaimed = unclaimAll(uuid);
    removeClaims(unclaimed);
    return sender.sendMessage(
      colors.green(`Unclaimed ${unclaimed.length} chunks`)
    );
  } catch (err) {
    return sender.sendMessage(colors.red(`Failed to unclaim all: ${err}`));
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
    sender.sendMessage(colors.yellow('This chunk has already been claimed'));
  } else {
    sender.sendMessage(colors.green('This chunk has not been claimed'));
  }
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
  </Command>
);
