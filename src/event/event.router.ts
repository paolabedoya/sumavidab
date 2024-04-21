import { Router } from 'express'
import EventController from './event.controller'

const EventRouter = Router()

EventRouter.get("/event/", EventController.getEvents)
EventRouter.get("/event/:id", EventController.getEvent)
EventRouter.post("/event/", EventController.createEvent)
EventRouter.put("/event/:id", EventController.updateEvent)
EventRouter.delete("/event/:id", EventController.deleteEvent)

export default EventRouter
