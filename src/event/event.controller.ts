import { Response } from 'express'
import Event from './event.model'
import type { Request } from '../utils/types'
import type { Event as TEvent } from '../utils/types'
import EventService from './event.service'

const EventController = {
    getEvents: async (_req: Request, res: Response) => {
        try {
            const events = await EventService.getAllEvents()
            res.send({
                status: "success",
                events
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido obtener los events"
            })
        }
    },

    getEvent: async (req: Request<any, { id: string }>, res: Response) => {
        const { id } = req.params
        try {
            const event = await EventService.getEventById(id)
            res.send({
                status: "success",
                event
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido obtener el event"
            })
        }
    },

    createEvent: async (req: Request<TEvent>, res: Response) => {
        try {
            const event = EventService.createEvent(req.body)

            res.send({
                status: "success",
                event
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido crear el event"
            })
        }
    },

    updateEvent: async (req: Request<TEvent, { id: string }>, res: Response) => {
        try {
            const event = await EventService.updateEvent({ _id: req.params.id, ...req.body })

            if (!event) {
                return res.send({
                    status: "failed",
                    message: "No se ha encontrado el event"
                })
            }

            res.send({
                status: "success",
                event
            })

        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido actualizar el event"
            })
        }

    },

    deleteEvent: async (req: Request<any, { id: string }>, res: Response) => {
        const { id } = req.params

        try {

            const event = await EventService.deleteEvent(id)

            if (!event) {
                return res.send({
                    status: "failed",
                    message: "No se ha encontrado el event"
                })
            }

            return res.send({
                status: "success",
                event
            })

        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido eliminar el event"
            })
        }

    },
}

export default EventController
