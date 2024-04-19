import { Router } from 'express'
import LifestyleController from './lifestyle.controller'

const LifestyleRouter = Router()

LifestyleRouter.get("/lifestyle/", LifestyleController.getLifestyles)
LifestyleRouter.get("/lifestyle/:id", LifestyleController.getLifestyle)
LifestyleRouter.post("/lifestyle/", LifestyleController.createLifestyle)
LifestyleRouter.put("/lifestyle/:id", LifestyleController.updateLifestyle)
LifestyleRouter.delete("/lifestyle/:id", LifestyleController.deleteLifestyle)

export default LifestyleRouter
