import { Router } from 'express'
import GroupController from './group.controller'

const GroupRouter = Router()

GroupRouter.get("/group/", GroupController.getGroups)
GroupRouter.get("/group/:id", GroupController.getGroup)
GroupRouter.post("/group/", GroupController.createGroup)
GroupRouter.put("/group/:id", GroupController.updateGroup)
GroupRouter.delete("/group/:id", GroupController.deleteGroup)

export default GroupRouter
