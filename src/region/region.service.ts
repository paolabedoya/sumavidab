import Region from "./region.model";
import { Region as TRegion } from "../utils/types";

const RegionService = {
  getAllRegions: async (): Promise<TRegion[]> => {
    return await Region.find();
  },
  getRegionById: async ({ id }: { id: string }): Promise<TRegion | null> => {
    return await Region.findById(id);
  },
  createRegion: async ({ name }: { name: string }): Promise<TRegion> => {
    return await new Region({ name }).save();
  },
  updateRegion: async ({
    _id,
    name,
  }: {
    _id: string;
    name: string;
  }): Promise<TRegion | null> => {
    return await Region.findOneAndUpdate(
      { _id },
      { name, updatedAt: new Date() },
      { new: true },
    );
  },
  deleteRegion: async (id: string): Promise<TRegion | null> => {
    const region = await Region.findByIdAndDelete(id);
    return region;
  },
};

export default RegionService;

