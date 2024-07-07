import { Response } from "express";
import type { Request } from "../utils/types";
import type { MenuRecommendation as TMenuRecommendation } from "../utils/types";
import MenuRecommendationService from "./menuRecommendation.service";

const MenuRecommendationController = {
  getMenuRecommendations: async (_req: Request, res: Response) => {
    try {
      const recommendations =
        await MenuRecommendationService.getAllMenuRecommendations();

      return res.send(recommendations);
    } catch (err) {
      return res.status(500).send();
    }
  },

  getMenuRecommendation: async (
    req: Request<any, { id: string }>,
    res: Response,
  ) => {
    const { id } = req.params;

    try {
      const recommendation =
        await MenuRecommendationService.getMenuRecommendationById(id);

      if (!recommendation) return res.status(404).send();

      return res.send(recommendation);
    } catch (err) {
      return res.status(500).send();
    }
  },

  createMenuRecommendation: async (
    req: Request<TMenuRecommendation>,
    res: Response,
  ) => {
    const {
      breakfast,
      brunch,
      lunch,
      afternoon_snack,
      dinner,
      image_url,
      professional_id,
    } = req.body;

    try {
      const recommendation =
        await MenuRecommendationService.createMenuRecommendation({
          breakfast,
          brunch,
          lunch,
          afternoon_snack,
          dinner,
          image_url,
          professional_id,
        });

      return res.status(201).send(recommendation);
    } catch (err) {
      return res.status(500).send();
    }
  },

  updateMenuRecommendation: async (
    req: Request<TMenuRecommendation, { id: string }>,
    res: Response,
  ) => {
    const { id } = req.params;

    try {
      const recommendation =
        await MenuRecommendationService.updateMenuRecommendation({
          _id: id,
          ...req.body,
        });

      if (!recommendation) return res.status(404).send();

      return res.send(recommendation);
    } catch (err) {
      return res.status(500).send();
    }
  },

  deleteMenuRecommendation: async (
    req: Request<any, { id: string }>,
    res: Response,
  ) => {
    const { id } = req.params;

    try {
      const recommendation =
        await MenuRecommendationService.deleteMenuRecommendation(id);

      if (!recommendation) return res.status(404).send();

      return res.status(204).send();
    } catch (err) {
      return res.status(500).send();
    }
  },
};

export default MenuRecommendationController;
