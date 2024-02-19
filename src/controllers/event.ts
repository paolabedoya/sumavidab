import { Request, Response } from 'express'
import Event from '../models/event'

const eventController = {
    getEvents: async (req: Request, res: Response) => {
        try {
            const events = await Event.find()
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

    getEvent: async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const event = await Event.findById(id)
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

    createEvent: async (req: Request, res: Response) => {
        const { start_date, end_date, description, venue_type, worker_id } = req.body

        try {
            const newEvent = new Event({
                start_date,
                end_date,
                description,
                venue_type,
                worker_id 
            })

            const resultDocument = await newEvent.save()

            res.send({
                status: "success",
                event: resultDocument
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido crear el event"
            })
        }
    },

    updateEvent: async (req: Request, res: Response) => {
        const { id } = req.params
        const { start_date, end_date, description, venue_type, worker_id } = req.body

        try {

            const event = await Event.findById(id)

            if (!event) {
                return res.send({
                    status: "failed",
                    message: "No se ha encontrado el event"
                })
            }

            event.start_date = start_date
            event.end_date = end_date
            event.description = description
            event.venue_type = venue_type
            event.worker_id = worker_id
            event.updatedAt = new Date()

            const resultDocument = await event.save()

            res.send({
                status: "success",
                event: resultDocument
            })

        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido actualizar el event"
            })
        }

    },

    deleteEvent: async (req: Request, res: Response) => {
        const { id } = req.params

        try {

            const event = await Event.findOneAndDelete({ _id: id })

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

export default eventController