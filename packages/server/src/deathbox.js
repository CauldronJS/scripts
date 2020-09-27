import { events } from 'cauldron';
import useStore from '@cauldron/store';
import useConfig from '@cauldron/config';
import { Material } from 'bukkit';
import { FixedMetadataValue } from 'bukkit/metadata';
import { EntityType } from 'bukkit/entity';

const [deathboxCache, setDeathboxCache] = useStore('deathboxes');
const [deathboxConfig, setDeathboxConfig] = useConfig('deathbox');

export default function deathboxService(server) {
  events.on('playerdeath', (event) => {
    if (event.getEntityType() !== EntityType.PLAYER) {
      return;
    }
    const player = event.getEntity();
    const drops = event.getDrops();
    if (deathboxConfig[player.getUniqueId()]?.disabled) {
      return;
    }
    // create the chest and move drops to the chest
    let block = player.getLocation().getBlock().getRelative(0, -2, 0);
    while (!block.isEmpty()) {
      block = block.getRelative(0, 1, 0);
    }
    block.setType(Material.CHEST);
    block.getState().setLock('test');
  });

  events.on('playerinteract', (event) => {
    const player = event.getPlayer();
    if (!event.hasBlock() || event.getMaterial() !== Material.CHEST) {
      return;
    }
    const state = event.getClickedBlock().getState();
    if (
      state.isLocked() &&
      state.getLock() !== player.getUniqueId().toString()
    ) {
      event.setCancelled(true);
    }
  });

  events.on('blockbreak', (event) => {
    const player = event.getPlayer();
    const block = event.getBlock();
    if (block.getType() !== Material.CHEST) {
      return;
    }
    const state = block.getState();
    if (
      state.isLocked() &&
      state.getLock() !== player.getUniqueId().toString()
    ) {
      event.setCancelled(true);
    }
  });
  return true;
}
