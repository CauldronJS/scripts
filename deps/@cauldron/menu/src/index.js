import { CLICK_TYPE, INVENTORY_ACTION } from './click-type';
import BukkitItemStack from '@java/org.bukkit.inventory.ItemStack';

const registeredMenus = [];
const noop = () => false;

export default class Menu {
  constructor(title) {
    this.id = registeredMenus.length;
    this._inventory = [];
    this._boundActions = [];
    this.title = title || 'Menu';
    registeredMenus.push(this);
  }

  getInventorySize() {
    return this._inventory.length + 9 - (this._inventory.length % 9);
  }

  add(
    item,
    { name = null, lore = null, index = -1, data },
    { leftClick = noop, rightClick = noop }
  ) {
    if (typeof item === 'string') {
      item = new BukkitItemStack(item);
    }
    if (lore) {
      const metaClone = item.itemMeta;
      metaClone.setLore(Array.isArray(lore) ? lore : [lore]);
      item.itemMeta = metaClone;
    }
  }
}
