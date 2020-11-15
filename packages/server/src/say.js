// because Spigot /say is broken half the time
import Rinse, { Command } from '@cauldronjs/rinse';
import { Bukkit } from 'bukkit';

const SayCommand = () => (
  <Command
    name="say"
    permission="cauldron.say"
    execute={(args) => Bukkit.broadcastMessage(args.join(' '))}
  />
);

export default SayCommand;
