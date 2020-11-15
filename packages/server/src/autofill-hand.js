import { Material } from 'bukkit';
import { events } from 'cauldronjs';
import { Sound } from 'bukkit';
import { EquipmentSlot } from 'bukkit/inventory';

export default function autofillHandService() {
  events.on('blockplace', (event) => {
    const player = event.getPlayer();
    const hand = event.getHand();
    const inHand = event.getItemInHand();
    const placed = event.getBlockPlaced();
    if (!inHand || inHand.getType() === Material.AIR) {
      // replace the item in hand
      const inv = player.getInventory();
      const matchingStackIndex = inv
        .getContents()
        .findIndex((item) => item.getType() === placed.getType());
      if (matchingStackIndex === -1) return;
      const stack = inv.getItem(matchingStackIndex);
      inv.setItem(matchingStackIndex, null);
      if (hand === EquipmentSlot.HAND) {
        inv.setItemInMainHand(stack);
      } else if (hand === EquipmentSlot.OFF_HAND) {
        inv.setItemInOffHand(stack);
      } else {
        return;
      }
      player.playSound(player.getLocation(), Sound.ENTITY_ITEM_PICKUP, 1, 1);
    }
  });
}
