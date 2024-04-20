import { Response } from 'express'
import Recipe from './recipe.model'
import type { Request } from '../utils/types'
import type { Recipe as TRecipe } from '../utils/types'
import RecipeService from './recipe.service'

const RecipeController = {
    getRecipes: async (_req: Request, res: Response) => {
        try {
            const recipes = await RecipeService.getAllRecipes()
            res.send({
                status: "success",
                recipes: recipes
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido obtener los recipes"
            })
        }
    },

    getRecipe: async (req: Request<any, { id: string }>, res: Response) => {
        const { id } = req.params
        try {
            const recipe = await RecipeService.getRecipeById(id)
            res.send({
                status: "success",
                recipe
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido obtener el recipe"
            })
        }
    },

    createRecipe: async (req: Request<TRecipe>, res: Response) => {
        const { name, ingredients, steps, image_url } = req.body

        try {
            const recipe = await RecipeService.createRecipe({ name, ingredients, steps, image_url })
            res.send({
                status: "success",
                recipe
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido crear el recipe"
            })
        }
    },

    updateRecipe: async (req: Request<TRecipe, { id: string }>, res: Response) => {
        const { id } = req.params

        try {
            const recipe = await RecipeService.updateRecipe({ _id: id, ...req.body })

            if (!recipe) {
                return res.send({
                    status: "failed",
                    message: "No se ha encontrado el recipe"
                })
            }

            res.send({
                status: "success",
                recipe
            })

        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido actualizar el recipe"
            })
        }

    },

    deleteRecipe: async (req: Request<any, { id: string }>, res: Response) => {
        const { id } = req.params

        try {

            const recipe = await RecipeService.deleteRecipe(id)

            if (!recipe) {
                return res.send({
                    status: "failed",
                    message: "No se ha encontrado el recipe"
                })
            }

            return res.send({
                status: "success",
                recipe
            })

        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido eliminar el recipe"
            })
        }

    },
}

export default RecipeController
