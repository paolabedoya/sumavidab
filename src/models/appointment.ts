import mongoose, { Schema } from 'mongoose'
import type { Appointment as TAppointment } from '../utils/types'

const appointmentSchema = new Schema<TAppointment>({
    _id: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ["psychology", "sport"],
    },
    appointment_id: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
    },
})

export default mongoose.model('Appointment', appointmentSchema)