import mongoose, { Schema } from 'mongoose'
import type { MedicalHistory as TMedicalHistory } from '../utils/types'

const MedicalHistorySchema = new Schema<TMedicalHistory>({
    patient_id: {
        type: String,
        required: true,
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

export default mongoose.model('MedicalHistory', MedicalHistorySchema)
