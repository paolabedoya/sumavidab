import { Router } from 'express'
import regionController from '../controllers/region'

const regionRouter = Router()

regionRouter.get("/", regionController.getRegions)
regionRouter.get("/:id", regionController.getRegion)
regionRouter.post("/", regionController.createRegion)
regionRouter.put("/:id", regionController.updateRegion)
regionRouter.delete("/:id", regionController.deleteRegion)

export default regionRouter