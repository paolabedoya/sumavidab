import { Router } from 'express'
import regionController from './region.controller'

const RegionRouter = Router()

RegionRouter.get("/region/", regionController.getRegions)
RegionRouter.get("/region/:id", regionController.getRegion)
RegionRouter.post("/region/", regionController.createRegion)
RegionRouter.put("/region/:id", regionController.updateRegion)
RegionRouter.delete("/region/:id", regionController.deleteRegion)

export default RegionRouter