import { Material } from 'bukkit';
import { events } from 'cauldronjs';
import useStore from '@cauldronjs/store';
import { locationToString } from './utils';

const signOwnerStore = useStore('rightClickSign', {});

events.on('playerinteract', (event) => {
  if (!event.getClickedBlock().getState().isEditable) {
    return;
  }

  const player = event.getPlayer();

  if (
    player.hasPermission('cauldronjs.rightClickSign.admin') ||
    signOwnerStore[locationToString(player.getLocation())] ===
      player.getUniqueId().toString()
  ) {
    // this player has permission to edit the sign
  }
});
