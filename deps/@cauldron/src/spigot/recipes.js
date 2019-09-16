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
} from 'bukkit/inventory';
import { Material } from 'bukkit';
import { NAMESPACE_KEY } from '@cauldron';
import ItemStack from './item-stack';

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
