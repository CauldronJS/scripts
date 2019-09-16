import BukkitItemStack from 'bukkit/inventory.ItemStack';

const ItemStack = props => {
  const { id, name, lore, count } = props;
  const itemStack = new BukkitItemStack(id, count);
  const clonedMeta = itemStack.itemMeta;
  clonedMeta.displayName = name;
  clonedMeta.setLore(Array.isArray(lore) ? lore : [lore]);
  itemStack.itemMeta = clonedMeta;
  return itemStack;
};

ItemStack.defaultProps = {
  count: 1
};

export default ItemStack;
