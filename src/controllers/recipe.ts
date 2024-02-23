import { Response } from 'express'
import Recipe from '../models/recipe'
import type { Request } from '../utils/types'
import type { Recipe as TRecipe } from '../utils/types'

const recipeController = {
    getRecipes: async (_req: Request, res: Response) => {
        try {
            const recipes = await Recipe.find()
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
            const recipe = await Recipe.findById(id)
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
            const newRecipe = new Recipe({
                name,
                ingredients,
                steps,
                image_url 
            })

            const resultDocument = await newRecipe.save()

            res.send({
                status: "success",
                recipe: resultDocument
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
        const { name, ingredients, steps, image_url } = req.body

        try {
            const recipe = await Recipe.findById(id)

            if (!recipe) {
                return res.send({
                    status: "failed",
                    message: "No se ha encontrado el recipe"
                })
            }

            recipe.name = name
            recipe.ingredients = ingredients
            recipe.steps = steps
            recipe.image_url = image_url
            recipe.updatedAt = new Date()

            const resultDocument = await recipe.save()

            res.send({
                status: "success",
                recipe: resultDocument
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

            const recipe = await Recipe.findOneAndDelete({ _id: id })

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

export default recipeController