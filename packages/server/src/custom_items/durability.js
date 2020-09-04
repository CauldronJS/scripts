import { events } from '@cauldron';
import { Bukkit, NamespacedKey } from 'bukkit';
import { BarColor, BarStyle } from 'bukkit/boss';
import { Damageable } from 'bukkit/inventory/meta';

const DURABILITY_KEY = new NamespacedKey(
  $$cauldron$$,
  'custom_items_durability'
);

/**
 * @returns {Damageable}
 */
const asDamageable = itemStack => Damageable.class().cast(itemStack);

// handle block break events and prevent the durability from going down
events.on('blockbreak', event => {
  const { player } = event;
  const inventory = player.getInventory();
  const itemInHand = inventory.getItemInMainHand();
  if (!itemInHand.hasItemMeta()) {
    return;
  }
  const meta = itemInHand.getItemMeta();
  if (meta.isUnbreakable()) {
    return;
  }
  const damageable = asDamageable(meta);
  if (damageable.hasDamage()) {
    const damage = damageable.getDamage();
    // apply the current damage to the boss bar and persist it
    damageable.setDamage(0);
  }
});
