import { Router } from 'express'
import eventController from '../controllers/event'

const eventRouter = Router()

eventRouter.get("/", eventController.getEvents)
eventRouter.get("/:id", eventController.getEvent)
eventRouter.post("/", eventController.createEvent)
eventRouter.put("/:id", eventController.updateEvent)
eventRouter.delete("/:id", eventController.deleteEvent)

export default eventRouter