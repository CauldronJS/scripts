import { ClickType, InventoryAction } from './click-type';
import BukkitItemStack from 'org.bukkit.inventory.ItemStack';
import { EventEmitter } from 'events';

const registeredMenus = [];
const noop = () => false;

const openInstances = Object.create(null);

export default class Menu extends EventEmitter {
  constructor(title) {
    super();
    this.id = registeredMenus.length;
    this._inventory = [];
    this._title = title || 'Menu';
    this.addListener('leftclick', this.handleLeftClick);
    registeredMenus.push(this);
  }

  get title() {
    return this._title;
  }

  get length() {
    return this._inventory.length + 9 - (this._inventory.length % 9);
  }

  handleLeftClick(index, player) {
    const menuItem = this._inventory[index];
    if (!menuItem) return true;
    const { item, leftClick } = menuItem;
    leftClick(player, item);
    return false;
  }

  add(
    item,
    { name = null, lore = null, index = -1 },
    { leftClick = noop, rightClick = noop }
  ) {
    if (typeof item === 'string') {
      // eslint-disable-next-line no-param-reassign
      item = new BukkitItemStack(item);
    }
    const metaClone = item.itemMeta;
    if (name) {
      metaClone.displayName = name;
    }
    if (lore) {
      metaClone.setLore(Array.isArray(lore) ? lore : [lore]);
    }
    item.itemMeta = metaClone;
  }
}
