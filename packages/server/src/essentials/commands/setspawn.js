import Rinse, { Command } from '@cauldronjs/rinse';

/**
 *
 * @param {import('@cauldronjs/rinse').CommandExecutor} cmd
 */
function executeSetSpawn(cmd) {
  const { sender } = cmd;
  const location = sender.getLocation();
  location.getWorld().setSpawnLocation(location);
  return `Successfully set spawn in ${location
    .getWorld()
    .getName()} to ${location.getBlockX()}, ${location.getBlockY()}, ${location.getBlockZ()}`;
}

const SetSpawnCommand = () => (
  <Command
    name="setspawn"
    permission="essentials.setspawn"
    execute={executeSetSpawn}
    isForPlayer
  />
);

export default SetSpawnCommand;
