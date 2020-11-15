import Rinse, { Command } from '@cauldronjs/rinse';
import { Bukkit } from 'bukkit';

const handleSetTime = (time) => ({ sender, args }) => {
  const world = args[0]
    ? Bukkit.getWorld(args[0])
    : sender.getLocation()?.getWorld();
  if (!world) return;
  world.setTime(time);
};

const TimeCommands = () => (
  <>
    <Command
      name="day"
      description="Sets the time of the world to day"
      permission="essentials.time.set"
      execute={handleSetTime(0)}
      usage="/<command> [world]"
      isForPlayer
    />
    <Command
      name="night"
      description="Sets the time of the world to night"
      permission="essentials.time.set"
      execute={handleSetTime(18000)}
      usage="/<command> [world]"
      isForPlayer
    />
    <Command
      name="noon"
      description="Sets the time of the world to noon"
      permission="essentials.time.set"
      execute={handleSetTime(9000)}
      usage="/<command> [world]"
      isForPlayer
    />
  </>
);

export default TimeCommands;
