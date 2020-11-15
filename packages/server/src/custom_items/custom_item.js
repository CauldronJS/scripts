import { Material, NamespacedKey } from 'bukkit';
import { ItemStack, Recipe } from 'bukkit/inventory';
import { PersistentDataType } from 'bukkit/persistence';
import useStore from '@cauldronjs/store';
import { ITEM_FIELD_NAMES_KEY } from './consts';

let registeredIds = 1;

function convertToPersistentData(value) {
  if (typeof value === 'string') {
    return `s::${value}`;
  } else if (typeof value === 'boolean') {
    return `b::${value}`;
  } else if (typeof value === 'number') {
    return `n::${value}`;
  } else {
    throw new Error(
      'Invalid property type: expected one of string, boolean, or number but got ' +
        typeof value
    );
  }
}

function convertFromPersistentData(data) {
  if (data.startsWith('s::')) {
    return data.substr(3);
  } else if (data.startsWith('b::')) {
    return data.substr(3) === 'true';
  } else if (data.startsWith('n::')) {
    return parseFloat(data.substr(3));
  } else {
    return data;
  }
}

function createOverride(id, model) {
  return { predicate: { custom_model_data: id }, model };
}

class CustomItemBuilder {
  /**
   *
   * @param {string} name
   */
  constructor(name) {
    this.name = name;
    this.material = Material.IRON_INGOT;
    this.durability = -1;
    this.recipes = [];
  }

  /**
   *
   * @param {Recipe} recipe
   *
   * @returns {CustomItemBuilder}
   */
  withRecipe(recipe) {
    this.recipes.push(recipe);
    return this;
  }

  /**
   *
   * @param {number} durability
   *
   * @returns {CustomItemBuilder}
   */
  withMaxDurability(durability) {
    this.durability = durability;
    return this;
  }

  withStartingDurability(durability) {
    this.startingDurability = durability;
    return this;
  }

  /**
   *
   * @param {string} name
   *
   * @returns {CustomItemBuilder}
   */
  withCustomItem(name) {
    this.id = registeredIds++;
    this.customModelName = name;
    return this;
  }

  fromMaterial(material) {
    this.material = material;
    return this;
  }

  build() {}
}

export function buildCustomItem(name, material) {
  return new CustomItemBuilder(name, material);
}

export function asCustom(itemStack) {}
