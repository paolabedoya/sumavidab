import { Router } from 'express'
import lifestyleController from '../controllers/lifestyle'

const lifestyleRouter = Router()

lifestyleRouter.get("/", lifestyleController.getLifestyles)
lifestyleRouter.get("/:id", lifestyleController.getLifestyle)
lifestyleRouter.post("/", lifestyleController.createLifestyle)
lifestyleRouter.put("/:id", lifestyleController.updateLifestyle)
lifestyleRouter.delete("/:id", lifestyleController.deleteLifestyle)

export default lifestyleRouter