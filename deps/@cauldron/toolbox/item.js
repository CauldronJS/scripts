import { Material } from '@java/org.bukkit';

export const nullOrAir = itemStack =>
  itemStack && itemStack.getType() !== Material.AIR;

/**
 *
 * @param {*} itemStack The item stack to update
 * @param {(itemMeta) => boolean} fn A function that will be called on the item stack's
 * metadata, returning if the update occurs or not
 */
export const updateItemMeta = (itemStack, fn) => {
  let itemMeta;
  if (!itemStack.hasItemMeta()) {
    itemMeta = Bukkit.getItemFactory().getItemMeta(itemStack.getType());
  } else {
    itemMeta = itemStack.getItemMeta();
  }
  const willUpdate = fn(itemMeta);
  if (willUpdate) {
    itemStack.setItemMeta(itemMeta);
  }
};
