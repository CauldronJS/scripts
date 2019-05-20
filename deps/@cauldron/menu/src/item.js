import ItemStack from '@java/org.bukkit.inventory.ItemStack';

const noop = () => false;

const Item = props => {
  const { id, name, lore, onLeftClick, onRightClick } = props;
  const itemStack = new ItemStack(id, 1);
  const clonedMeta = itemStack.itemMeta;
  clonedMeta.displayName = name;
  clonedMeta.setLore(Array.isArray(lore) ? lore : [lore]);
};

Item.defaultProps = {
  lore: [],
  onLeftClick: noop,
  onRightClick: noop
};

export default Item;
