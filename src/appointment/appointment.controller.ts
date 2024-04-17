import { Response } from 'express'
import type { Request } from '../utils/types'
import Appointment from './appointment.model'
import type { Appointment as TAppointment } from '../utils/types'
import AppointmentService from './appointment.service'

const AppointmentController = {
    getAppointments: async (_req: Request, res: Response) => {
        try {
            const appointments = await AppointmentService.getAllAppointments()
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

    getAppointment: async (req: Request<any, { id: string }>, res: Response) => {
        const { id } = req.params
        try {
            const appointment = await AppointmentService.getAppointmentById(id)
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

    createAppointment: async (req: Request<TAppointment, any>, res: Response) => {
        const { type, appointment_id } = req.body

        try {
            const appointment = await AppointmentService.createAppointment({ type, appointment_id })
            res.send({
                status: "success",
                appointment
            })
        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido crear el appointment"
            })
        }
    },

    updateAppointment: async (req: Request<TAppointment, { id: string }>, res: Response) => {
        const { id } = req.params
        const { type, appointment_id } = req.body

        try {

            const appointment = await AppointmentService.updateAppointment({ _id: id, type, appointment_id})

            if (!appointment) {
                return res.send({
                    status: "failed",
                    message: "No se ha encontrado el appointment"
                })
            }

            res.send({
                status: "success",
                appointment
            })

        } catch(err) {
            return res.send({
                status: "failed",
                message: "No se ha podido actualizar el appointment"
            })
        }

    },

    deleteAppointment: async (req: Request<any, { id: string }>, res: Response) => {
        const { id } = req.params

        try {

            const appointment = await AppointmentService.deleteAppointment(id)

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

export default AppointmentController