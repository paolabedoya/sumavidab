import { Router } from 'express'
import recipeController from '../controllers/recipe'

const recipeRouter = Router()

recipeRouter.get("/", recipeController.getRecipes)
recipeRouter.get("/:id", recipeController.getRecipe)
recipeRouter.post("/", recipeController.createRecipe)
recipeRouter.put("/:id", recipeController.updateRecipe)
recipeRouter.delete("/:id", recipeController.deleteRecipe)

export default recipeRouter