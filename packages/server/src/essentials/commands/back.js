import Rinse, { Command } from '@cauldronjs/rinse';
import colors from '@cauldronjs/colors';
import { events } from 'cauldronjs';
import { TeleportEvent } from 'bukkit/event/player';

const lastPosition = Object.create(null);

const BackCommand = () => {
  events.on('playerteleport', event => {
    lastPosition[event.getPlayer().getUniqueId()] = event.getFrom();
  });

  return (
    <Command name="back" permission="essentials.back" execute={({sender, args}) => {
      if (lastPosition[sender.getUniqueId()]) {
        sender.teleport(lastPosition[sender.getUniqueId()]);
        return colors.aqua('Teleported you to your previous location');
      } else {
        return colors.yellow('No previous location found!');
      }
    }} isForPlayer />
  )
}

export default BackCommand;