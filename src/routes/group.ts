import { Router } from 'express'
import groupController from '../controllers/group'

const groupRouter = Router()

groupRouter.get("/", groupController.getGroups)
groupRouter.get("/:id", groupController.getGroup)
groupRouter.post("/", groupController.createGroup)
groupRouter.put("/:id", groupController.updateGroup)
groupRouter.delete("/:id", groupController.deleteGroup)

export default groupRouter