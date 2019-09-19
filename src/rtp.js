import Rinse from '@cauldron/rinse';
import { Command } from '@cauldron';
import { Location, Material } from 'bukkit';
import colors from '@cauldron/colors';

const BAD_BLOCKS = [
  Material.LAVA,
  Material.LEGACY_LAVA,
  Material.WATER,
  Material.LEGACY_WATER
];

const getLargeRandom = () =>
  parseInt(
    `${Math.floor(Math.random() * 2) === 1 ? '' : '-'}${Math.sqrt(
      Math.floor(Math.random() * Date.now())
    ) / 3}`
  );

const executeRtp = ({ sender, args }) => {
  sender.sendMessage(colors.yellow('Finding an appropriate location...'));
  const world =
    args.length === 0 ? sender.getWorld() : Bukkit.getWorld(args[0]);
  if (!world) {
    sender.sendMessage(colors.red('Cannot find a world with that name!'));
    return false;
  }
  const currentLocation = sender.getLocation();
  let newLocation = {
    x: currentLocation.getBlockX() + getLargeRandom(),
    y: 255,
    z: currentLocation.getBlockZ() + getLargeRandom()
  };
  // now we iterate down until we hit solid ground (well, non-air or non-lava)
  while (newLocation.y > 64) {
    // do check
    const blockAt = world
      .getBlockAt(newLocation.x, newLocation.y, newLocation.z)
      .getType();
    if (blockAt === Material.AIR) {
      newLocation.y--;
    } else if (BAD_BLOCKS.indexOf(blockAt) > -1) {
      newLocation = {
        x: currentLocation.getBlockX() + getLargeRandom(),
        y: 255,
        z: currentLocation.getBlockZ() + getLargeRandom()
      };
    } else {
      break;
    }
  }
  sender.teleport(
    new Location(world, newLocation.x, newLocation.y, newLocation.z)
  );
  return colors.green('\xA7aSuccessfully teleported you!');
};

const RtpCommand = () => (
  <Command name="rtp" permission="nn.rtp" execute={executeRtp} isForPlayer />
);

export default RtpCommand;
