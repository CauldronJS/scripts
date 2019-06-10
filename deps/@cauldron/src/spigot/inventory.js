import {
  BlastingRecipe,
  CampfireRecipe,
  FurnaceRecipe,
  MerchantRecipe,
  ShapedRecipe,
  ShapelessRecipe,
  SmokingRecipe,
  StonecuttingRecipe,
  RecipeChoice
} from '@java/org.bukkit.inventory';
import BUkkitItemStack from '@java/org.bukkit.inventory.ItemStack';
import { Material } from '@java/org.bukkit';
import { NAMESPACE_KEY } from '@cauldron';

export class ItemStack {
  constructor(
    material,
    {
      amount = 1,
      enchantments: []
    }
  ) {
    this.$$baseItemStack = getItemStack(material);
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

function getItemStack(data) {
  // this will accept either a string of the material name,
  // an object with { id, meta }, { id, damage }, or a
  // CauldronItem object
  return data;
}

function getEnchantments(data) {}

export const blastingRecipe = ({
  result,
  input,
  experience = 0,
  cookingTime = 20
}) => new BlastingRecipe(NAMESPACE_KEY, getItemStack(result));
