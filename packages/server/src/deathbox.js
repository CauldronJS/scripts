import { events } from 'cauldronjs';
import useStore from '@cauldronjs/store';
import useConfig from '@cauldronjs/config';
import { Location, Material } from 'bukkit';
import { EntityType } from 'bukkit/entity';

const [deathboxCache, setDeathboxCache] = useStore('deathboxes');
const [deathboxConfig, setDeathboxConfig] = useConfig('deathbox');

/**
 *
 * @param {import('bukkit').Server} server
 */
export default function deathboxService(server) {
  const jsonToLocation = (json) =>
    new Location(server.getWorld(json.world), json.x, json.y, json.z);
  const locationToJson = (location) => ({
    x: location.getX(),
    y: location.getY(),
    z: location.getZ(),
    world: location.getWorld().getName(),
  });

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
    const state = block.getState();
    state.getBlockInventory().setContents(drops);
    if (!state.update(true)) {
      console.error('An error occured when updating the state of the chest');
    }
    setDeathboxCache({
      [player.getUniqueId().toString()]: locationToJson(block.getLocation()),
    });
  });

  events.on('playerinteract', (event) => {
    const player = event.getPlayer();
    if (!event.hasBlock() || event.getMaterial() !== Material.CHEST) {
      return;
    }
    const state = event.getClickedBlock().getState();
    if (
      state.isLocked() &&
      state.getLock() !== player.getUniqueId().toString() &&
      !player.hasPermission('deathbox.admin')
    ) {
      event.setCancelled(true);
    } else {
      state.setLock('');
      state.update(true);
    }
  });

  events.on('blockbreak', (event) => {
    const player = event.getPlayer();
    const block = event.getBlock();
    if (block.getType() !== Material.CHEST) {
      return;
    }
    const playersDeathbox = jsonToLocation(
      deathboxCache[player.getUniqueId().toString()]
    );
    if (
      block.getLocation().equals(playersDeathbox) &&
      !player.hasPermission('deathbox.admin')
    ) {
      event.setCancelled(true);
    } else {
      setDeathboxCache({ [player.getUniqueId().toString()]: undefined });
    }
  });
  return true;
}
