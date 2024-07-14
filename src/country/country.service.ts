import Country from "./country.model";
import type { Country as TCountry } from "../utils/types";

const CountryService = {
  getAllCountries: async (): Promise<TCountry[]> => {
    const countries = await Country.find();
    return countries;
  },
  getCountryById: async (id: string): Promise<TCountry | null> => {
    const country = await Country.findById(id);
    return country;
  },
  createCountry: async ({ name }: { name: string }): Promise<TCountry> => {
    const newCountry = new Country({ name });
    const resultDocument = await newCountry.save();
    return resultDocument;
  },
  updateCountry: async ({
    _id,
    name,
  }: {
    _id: string;
    name: string;
  }): Promise<TCountry | null> => {
    const country = await Country.findOneAndUpdate(
      { _id },
      { name, updatedAt: new Date() },
      { new: true },
    );
    return country;
  },
  deleteCountry: async (id: string): Promise<TCountry | null> => {
    const country = await Country.findByIdAndDelete(id);
    return country;
  },
};

export default CountryService;
