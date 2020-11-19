import { events } from 'cauldronjs';
import { GameMode, Sound } from 'bukkit';
import { EquipmentSlot } from 'bukkit/inventory';

/**
 *
 * @param {import('bukkit/entity').Player} player
 * @param {import('bukkit').Material} type
 */
function fillHandNext(player, type) {
  const inv = player.getInventory();
  const matchingStackIndex = Array.from(inv.getContents()).findIndex(
    (item, i) => item?.getType() === type && i !== inv.getHeldItemSlot()
  );
  if (matchingStackIndex === -1) return;
  const stack = inv.getItem(matchingStackIndex);
  inv.setItem(matchingStackIndex, null);
  inv.setItemInMainHand(stack);
  player.playSound(player.getLocation(), Sound.ENTITY_ITEM_PICKUP, 1, 1);
}

export default function autofillHandService() {
  events.on('blockplace', (event) => {
    const player = event.getPlayer();
    if (player.getGameMode() === GameMode.CREATIVE) return;
    const hand = event.getHand();
    const inHand = event.getItemInHand();
    if (inHand.getAmount() === 1 && hand === EquipmentSlot.HAND) {
      fillHandNext(player, inHand.getType());
    }
  });

  events.on('playeritembreak', (event) => {
    const player = event.getPlayer();
    const type = event.getBrokenItem().getType();
    const inHand = player.getInventory().getItem(EquipmentSlot.HAND);
    if (event.getBrokenItem().equals(inHand)) {
      fillHandNext(player, type);
    }
  });
}
