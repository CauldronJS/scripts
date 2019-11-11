const {
  BlastingRecipe,
  CampfireRecipe,
  FurnaceRecipe,
  MerchantRecipe,
  ShapedRecipe,
  ShapelessRecipe,
  SmokingRecipe,
  StonecuttingRecipe,
  RecipeChoice
} = require('bukkit/inventory');
const { Material } = require('bukkit');
const { NAMESPACE_KEY } = require('@cauldron');
const ItemStack = require('./item-stack');

export const blastingRecipe = ({
  result,
  input,
  experience = 0,
  cookingTime = 20
}) => new BlastingRecipe(NAMESPACE_KEY);

export const campfireRecipe = ({
  result,
  input,
  experience = 0,
  cookingTime = 20
}) => new CampfireRecipe(NAMESPACE_KEY);

export const furnaceRecipe = ({ result }) => new FurnaceRecipe(NAMESPACE_KEY);
