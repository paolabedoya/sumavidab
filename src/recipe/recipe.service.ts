import Recipe from './recipe.model'
import type { Recipe as TRecipe } from '../utils/types'

const RecipeService = {
  getAllRecipes: async (): Promise<TRecipe[]> => {
    return await Recipe.find()
  },
  getRecipeById: async (id: string): Promise<TRecipe | null> => {
    return await Recipe.findById(id)
  },
  createRecipe: async (recipe: Partial<TRecipe>): Promise<TRecipe> => {
    return await new Recipe({ ...recipe }).save()
  },
  updateRecipe: async (recipe: Partial<TRecipe>): Promise<TRecipe | null> => {
    return await Recipe.findOneAndUpdate({ _id: recipe._id }, { ...recipe }, { new: true })
  },
  deleteRecipe: async (id: string): Promise<TRecipe | null> => {
    return await Recipe.findByIdAndDelete(id)
  }
}

export default RecipeService
