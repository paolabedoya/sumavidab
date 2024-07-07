import { Response } from "express";
import type { Request } from "../utils/types";
import type { Country as TCountry } from "../utils/types";
import CountryService from "./country.service";

const CountryController = {
  getCountries: async (_req: Request, res: Response) => {
    try {
      const countries = await CountryService.getAllCountries();

      return res.send(countries);
    } catch (err) {
      return res.status(500).send();
    }
  },

  getCountry: async (req: Request<any, { id: string }>, res: Response) => {
    const { id } = req.params;
    try {
      const country = await CountryService.getCountryById(id);

      if (!country) return res.status(404).send();

      return res.send(country);
    } catch (err) {
      return res.status(500).send();
    }
  },

  createCountry: async (req: Request<TCountry>, res: Response) => {
    const { name } = req.body;

    try {
      const country = await CountryService.createCountry({ name });

      return res.status(201).send(country);
    } catch (err) {
      return res.status(500).send();
    }
  },

  updateCountry: async (
    req: Request<TCountry, { id: string }>,
    res: Response,
  ) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const country = await CountryService.updateCountry({ id, name });

      if (!country) return res.status(404).send();

      return res.send(country);
    } catch (err) {
      return res.status(500).send();
    }
  },

  deleteCountry: async (req: Request<any, { id: string }>, res: Response) => {
    const { id } = req.params;

    try {
      const country = await CountryService.deleteCountry(id);

      if (!country) return res.status(404).send();

      return res.status(204).send();
    } catch (err) {
      return res.status(500).send();
    }
  },
};

export default CountryController;
