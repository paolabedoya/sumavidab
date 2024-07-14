import { Response } from "express";
import type { Request } from "../utils/types";
import type { Region as TRegion } from "../utils/types";
import RegionService from "./region.service";

const RegionController = {
  getRegions: async (_req: Request, res: Response) => {
    try {
      const regions = await RegionService.getAllRegions();

      return res.send(regions);
    } catch (err) {
      return res.status(500).send();
    }
  },

  getRegion: async (req: Request<unknown, { id: string }>, res: Response) => {
    const { id } = req.params;

    try {
      const region = await RegionService.getRegionById({ id });

      if (!region) return res.status(404).send();

      return res.send(region);
    } catch (err) {
      return res.status(500).send();
    }
  },

  createRegion: async (req: Request<TRegion>, res: Response) => {
    const { name } = req.body;

    try {
      const region = await RegionService.createRegion({ name });

      return res.status(201).send(region);
    } catch (err) {
      return res.status(500).send();
    }
  },

  updateRegion: async (
    req: Request<TRegion, { id: string }>,
    res: Response,
  ) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const region = await RegionService.updateRegion({ _id: id, name });

      if (!region) return res.status(404).send();

      return res.send(region);
    } catch (err) {
      return res.status(500).send();
    }
  },

  deleteRegion: async (req: Request<any, { id: string }>, res: Response) => {
    const { id } = req.params;

    try {
      const region = await RegionService.deleteRegion(id);

      if (!region) return res.status(404).send();

      return res.status(204).send(region);
    } catch (err) {
      return res.status(500).send();
    }
  },
};

export default RegionController;
