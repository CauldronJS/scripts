import { events } from 'cauldronjs';

export default function noDropService() {
  events.on('blockbreak', (event) => {
    const inventory = event.getPlayer().getInventory();
    const block = event.getBlock();
    const dropItems = [...block.getDrops()];
    for (let i = 0; i < dropItems; ++i) {
      const drop = dropItems[i];
      const slot = inventory.firstEmpty();
      if (slot === -1) {
        block.getWorld().dropNaturally(block.getLocation(), drop);
        break;
      }
    }
  });
}
