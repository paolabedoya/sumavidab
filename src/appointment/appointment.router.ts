import { Router } from 'express'
import appointmentController from './appointment.controller'

const AppointmentRouter = Router()

AppointmentRouter.get("/appointment/", appointmentController.getAppointments)
AppointmentRouter.get("/appointment/:id", appointmentController.getAppointment)
AppointmentRouter.post("/appointment/", appointmentController.createAppointment)
AppointmentRouter.put("/appointment/:id", appointmentController.updateAppointment)
AppointmentRouter.delete("/appointment/:id", appointmentController.deleteAppointment)

export default AppointmentRouter