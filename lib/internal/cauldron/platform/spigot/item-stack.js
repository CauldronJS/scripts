const { ItemStack: BukkitItemStack } = require('bukkit/inventory');

function getItemStack(data) {
  // this will accept either a string of the material name,
  // an object with { id, meta }, { id, damage }, or a
  // CauldronItem object
  return data;
}

function getEnchantments(data) {}

class ItemStack {
  constructor(type, { amount = 1, enchantments = [] }) {
    this.$$baseItemStack = getItemStack(type);
    this.$$baseItemStack.setAmount(amount);
  }

  get amount() {
    return this.$$baseItemStack.getAmount();
  }

  set amount(value) {
    this.$$baseItemStack.setAmount(value);
  }

  get enchantments() {
    return this.$$baseItemStack.getEnchantments();
  }

  set enchantments(value) {
    this.$$baseItemStack.setEnchantments(value);
  }

  get type() {
    return this.$$baseItemStack.getType();
  }

  set type(value) {
    this.$$baseItemStack.setType(value);
  }

  get maxStackSize() {
    return this.$$baseItemStack.getMaxStackSize();
  }

  isSimilar(itemStack) {
    return this.$$baseItemStack.isSimilar(getItemStack(itemStack));
  }
}

module.exports = ItemStack;
