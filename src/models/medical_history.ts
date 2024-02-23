import mongoose, { Schema } from 'mongoose'

const medicalHistorySchema = new Schema({
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

export default mongoose.model('MedicalHistory', medicalHistorySchema)