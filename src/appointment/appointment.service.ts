import Appointment from './appointment.model'
import type { Appointment as TAppointment } from '../utils/types'

const AppointmentService = {
  getAllAppointments: async (): Promise<TAppointment[]> => {
    return await Appointment.find()
  },
  getAppointmentById: async (id: string): Promise<TAppointment | null> => {
    return await Appointment.findById(id)
  },
  createAppointment: async ({ type, appointment_id }: Partial<TAppointment>): Promise<TAppointment> => {
    return await new Appointment({ type, appointment_id }).save()
  },
  updateAppointment: async ({ _id: id, type, appointment_id }: Partial<TAppointment>): Promise<TAppointment | null> => {
    return await Appointment.findOneAndUpdate({ _id: id }, { type, appointment_id, updatedAt: new Date() }, { new: true })
  },
  deleteAppointment: async (id: string): Promise<TAppointment | null> => {
    return await Appointment.findByIdAndDelete(id)
  }
}

export default AppointmentService
