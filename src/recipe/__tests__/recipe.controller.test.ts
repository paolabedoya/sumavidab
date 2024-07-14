import RecipeController from "../recipe.controller";
import RecipeService from "../recipe.service";

jest.mock("../recipe.service.ts", () => ({
  getAllRecipes: jest.fn(),
  getRecipeById: jest.fn(),
  createRecipe: jest.fn(),
  updateRecipe: jest.fn(),
  deleteRecipe: jest.fn(),
}));

describe("Testing ~ RecipeController", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });

  describe("RecipeController ~ getRecipes", () => {
    beforeAll(() => {
      req = {};
    });

    it("returns an empty array when the request works", async () => {
      (RecipeService.getAllRecipes as jest.Mock).mockResolvedValue([]);

      await RecipeController.getRecipes(req, res);

      expect(res.send).toHaveBeenCalledWith([]);
      expect(res.status).not.toHaveBeenCalled();
    });

    it("returns a 500 error when the request fails", async () => {
      (RecipeService.getAllRecipes as jest.Mock).mockRejectedValue(new Error());
      await RecipeController.getRecipes(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("RecipeController ~ getRecipe", () => {
    const id = 100;

    beforeAll(() => {
      req = { params: { id: id } };
    });

    it("calls the send method with an object when everything is OK", async () => {
      (RecipeService.getRecipeById as jest.Mock).mockResolvedValue({
        id,
      });

      await RecipeController.getRecipe(req, res);

      expect(res.send).toHaveBeenCalledWith({ id });
      expect(res.status).not.toHaveBeenCalled();
    });

    it("returns a 404 error when the recipe is not found", async () => {
      (RecipeService.getRecipeById as jest.Mock).mockResolvedValue(null);

      await RecipeController.getRecipe(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("returns a 500 error when the request fails", async () => {
      (RecipeService.getRecipeById as jest.Mock).mockRejectedValue({});

      await RecipeController.getRecipe(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("RecipeController ~ createRecipe", () => {
    const id = 100;

    const createBody = {
      name: "recipe_name1",
    };

    beforeAll(() => {
      req = {
        params: {},
        body: createBody,
      };
    });

    it("creates an recipd with a valid body", async () => {
      (RecipeService.createRecipe as jest.Mock).mockImplementation(
        ({ name }) => ({
          _id: id,
          name,
        }),
      );

      await RecipeController.createRecipe(req, res);

      expect(res.send).toHaveBeenCalledWith({ _id: id, ...createBody });
      expect(res.status).toHaveBeenCalledWith(201);
    });

    it("returns 500 error when the service fails", async () => {
      (RecipeService.createRecipe as jest.Mock).mockRejectedValue({});

      await RecipeController.createRecipe(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("RecipeController ~ updateRecipe", () => {
    const id = 100;

    const updateBody = {
      name: "recipe_name2",
    };

    beforeAll(() => {
      req = {
        params: {
          id,
        },
        body: updateBody,
      };
    });

    it("updates an recipe with a valid body", async () => {
      (RecipeService.updateRecipe as jest.Mock).mockImplementation(
        ({ _id, name }) => ({ _id, name }),
      );

      await RecipeController.updateRecipe(req, res);

      expect(res.send).toHaveBeenCalledWith({ _id: id, ...updateBody });
      expect(res.status).not.toHaveBeenCalled();
    });

    it("returns error 404 when the service doesn't find the recipe", async () => {
      (RecipeService.updateRecipe as jest.Mock).mockResolvedValue(null);

      await RecipeController.updateRecipe(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("returns error 500 when the service throws an error", async () => {
      (RecipeService.updateRecipe as jest.Mock).mockRejectedValue({});

      await RecipeController.updateRecipe(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });

  describe("RecipeController ~ deleteRecipe", () => {
    const id = 100;

    beforeAll(() => {
      req = { params: { id } };
    });

    it("deletes an recipe with an existing id", async () => {
      (RecipeService.deleteRecipe as jest.Mock).mockImplementation((id) => ({
        _id: id,
        name: "recipe_name3",
      }));

      await RecipeController.deleteRecipe(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(204);
    });

    it("returns error 404 when the service doesn't find the recipe", async () => {
      (RecipeService.deleteRecipe as jest.Mock).mockResolvedValue(null);

      await RecipeController.deleteRecipe(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(404);
    });

    it("returns error 500 when the service throws an error", async () => {
      (RecipeService.deleteRecipe as jest.Mock).mockRejectedValue({});

      await RecipeController.deleteRecipe(req, res);

      expect(res.send).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
    });
  });
});
