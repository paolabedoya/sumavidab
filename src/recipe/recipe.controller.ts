import { Response } from "express";
import Recipe from "./recipe.model";
import type { Request } from "../utils/types";
import type { Recipe as TRecipe } from "../utils/types";
import RecipeService from "./recipe.service";

const RecipeController = {
  getRecipes: async (_req: Request, res: Response) => {
    try {
      const recipes = await RecipeService.getAllRecipes();

      return res.send(recipes);
    } catch (err) {
      return res.status(500).send();
    }
  },

  getRecipe: async (req: Request<any, { id: string }>, res: Response) => {
    const { id } = req.params;

    try {
      const recipe = await RecipeService.getRecipeById(id);

      if (!recipe) return res.status(404).send();

      return res.send(recipe);
    } catch (err) {
      return res.status(500).send();
    }
  },

  createRecipe: async (req: Request<TRecipe>, res: Response) => {
    const { name, ingredients, steps, image_url } = req.body;

    try {
      const recipe = await RecipeService.createRecipe({
        name,
        ingredients,
        steps,
        image_url,
      });

      return res.status(404).send(recipe);
    } catch (err) {
      return res.status(500).send();
    }
  },

  updateRecipe: async (
    req: Request<TRecipe, { id: string }>,
    res: Response,
  ) => {
    const { id } = req.params;

    try {
      const recipe = await RecipeService.updateRecipe({ _id: id, ...req.body });

      if (!recipe) return res.status(404).send();

      return res.send(recipe);
    } catch (err) {
      return res.status(500).send();
    }
  },

  deleteRecipe: async (req: Request<any, { id: string }>, res: Response) => {
    const { id } = req.params;

    try {
      const recipe = await RecipeService.deleteRecipe(id);

      if (!recipe) return res.status(404).send();

      return res.status(204).send();
    } catch (err) {
      return res.status(500).send();
    }
  },
};

export default RecipeController;
