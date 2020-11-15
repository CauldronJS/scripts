import { events } from 'cauldronjs';
import colors from '@cauldronjs/colors';
import { Material } from 'bukkit';
import { Vector } from 'bukkit/util';

const MAX_HEIGHT = 32;

function isFloorBlock(block) {
  return block?.getType() === Material.IRON_BLOCK;
}

/**
 *
 * @param {import('bukkit').Location} location
 */
function getLowerLevel(location) {
  const block = location.getBlock();
  if (!isFloorBlock(block)) {
    return false;
  } else {
    let nextBlock = location,
      i = 0;
    while (
      (nextBlock = nextBlock.add(0, -1, 0)).getBlock().isPassable() &&
      i++ < MAX_HEIGHT
    ) {}
    if (i < 2) {
      return false;
    }
    return isFloorBlock(nextBlock.getBlock()) ? nextBlock.add(0, 1, 0) : false;
  }
}

function getUpperLevel(location) {
  const block = location.getBlock();
  if (isFloorBlock(block)) {
    let nextBlock = location,
      i = 0;
    while (
      (nextBlock = nextBlock.add(0, 1, 0)).getBlock().isPassable() &&
      i++ < MAX_HEIGHT
    ) {}
    if (i < 2) {
      return false;
    }
    return isFloorBlock(nextBlock.getBlock()) ? nextBlock.add(0, 1, 0) : false;
  } else {
    return false;
  }
}

export default function elevatorsService(server) {
  events.on('playertogglesneak', (event) => {
    if (event.isSneaking()) {
      // send lower level
      const lowerLevel = getLowerLevel(
        event.getPlayer().getLocation().add(0, -1, 0)
      );
      if (lowerLevel) {
        event.getPlayer().teleport(lowerLevel);
      }
    }
  });

  events.on('playermove', (event) => {
    if (event.getPlayer().isFlying()) {
      return;
    }
    const velocity = event.getPlayer().getVelocity();
    const isJumping =
      velocity.getY() > 0 && velocity.getX() === 0 && velocity.getZ() === 0;
    if (isJumping) {
      const upperLevel = getUpperLevel(event.getFrom().add(0, -1, 0));
      if (upperLevel) {
        event.getPlayer().teleport(upperLevel);
        event.getPlayer().setVelocity(new Vector(0, 0, 0));
      }
    }
  });
}
