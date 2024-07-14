import { Response } from "express";
import type { Request } from "../utils/types";
import type { Lifestyle as TLifestyle } from "../utils/types";
import LifestyleService from "./lifestyle.service";

const LifestyleController = {
  getLifestyles: async (_req: Request, res: Response) => {
    try {
      const lifestyles = await LifestyleService.getAllLifestyles();

      return res.send(lifestyles);
    } catch (err) {
      return res.status(500).send();
    }
  },

  getLifestyle: async (req: Request<any, { id: string }>, res: Response) => {
    const { id } = req.params;
    try {
      const lifestyle = await LifestyleService.getLifestyleById(id);

      if (!lifestyle) return res.status(404).send();

      return res.send(lifestyle);
    } catch (err) {
      return res.status(500).send();
    }
  },

  createLifestyle: async (req: Request<TLifestyle>, res: Response) => {
    const { name } = req.body;

    try {
      const lifestyle = await LifestyleService.createLifestyle({ name });

      return res.status(201).send(lifestyle);
    } catch (err) {
      return res.status(500).send();
    }
  },

  updateLifestyle: async (
    req: Request<TLifestyle, { id: string }>,
    res: Response,
  ) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const lifestyle = await LifestyleService.updateLifestyle({
        _id: id,
        name,
      });

      if (!lifestyle) return res.status(404).send();

      return res.send(lifestyle);
    } catch (err) {
      return res.status(500).send();
    }
  },

  deleteLifestyle: async (req: Request<any, { id: string }>, res: Response) => {
    const { id } = req.params;

    try {
      const lifestyle = await LifestyleService.deleteLifestyle(id);

      if (!lifestyle) return res.status(404).send();

      return res.status(204).send();
    } catch (err) {
      return res.status(500).send();
    }
  },
};

export default LifestyleController;
