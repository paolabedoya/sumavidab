import { Router } from 'express'
import RecipeController from './recipe.controller'

const RecipeRouter = Router()

RecipeRouter.get("/recipe/", RecipeController.getRecipes)
RecipeRouter.get("/recipe:id/", RecipeController.getRecipe)
RecipeRouter.post("/recipe/", RecipeController.createRecipe)
RecipeRouter.put("/recipe:id/", RecipeController.updateRecipe)
RecipeRouter.delete("/recipe:id/", RecipeController.deleteRecipe)

export default RecipeRouter
