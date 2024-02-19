import { Request, Response } from 'express'
import Appointment from '../models/appointment'

const appointmentController = {
    getAppointments: async (req: Request, res: Response) => {
        try {
            const appointments = await Appointment.find()
            res.send({
                status: "success",
                appointments
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido obtener los appointments"
            })
        }
    },

    getAppointment: async (req: Request, res: Response) => {
        const { id } = req.params
        try {
            const appointment = await Appointment.findById(id)
            res.send({
                status: "success",
                appointment
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido obtener el appointment"
            })
        }
    },

    createAppointment: async (req: Request, res: Response) => {
        const { type, appointment_id } = req.body

        try {
            const newAppointment = new Appointment({
                type,
                appointment_id
            })

            const resultDocument = await newAppointment.save()

            res.send({
                status: "success",
                appointment: resultDocument
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido crear el appointment"
            })
        }
    },

    updateAppointment: async (req: Request, res: Response) => {
        const { id } = req.params
        const { type, appointment_id } = req.body

        try {

            const appointment = await Appointment.findById(id)

            if (!appointment) {
                return res.send({
                    status: "failed",
                    message: "No se ha encontrado el appointment"
                })
            }

            appointment.type = type
            appointment.appointment_id = appointment_id
            appointment.updatedAt = new Date()

            const resultDocument = await appointment.save()

            res.send({
                status: "success",
                appointment: resultDocument
            })

        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido actualizar el appointment"
            })
        }

    },

    deleteAppointment: async (req: Request, res: Response) => {
        const { id } = req.params

        try {

            const appointment = await Appointment.findOneAndDelete({ _id: id })

            if (!appointment) {
                return res.send({
                    status: "failed",
                    message: "No se ha encontrado el appointment"
                })
            }

            return res.send({
                status: "success",
                appointment
            })

        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido eliminar el appointment"
            })
        }

    },
}

export default appointmentController