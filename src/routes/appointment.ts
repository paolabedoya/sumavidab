import { Router } from 'express'
import appointmentController from '../controllers/appointment'

const appointmentRouter = Router()

appointmentRouter.get("/", appointmentController.getAppointments)
appointmentRouter.get("/:id", appointmentController.getAppointment)
appointmentRouter.post("/", appointmentController.createAppointment)
appointmentRouter.put("/:id", appointmentController.updateAppointment)
appointmentRouter.delete("/:id", appointmentController.deleteAppointment)

export default appointmentRouter