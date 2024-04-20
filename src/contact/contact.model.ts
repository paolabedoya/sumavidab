import mongoose, { Schema } from 'mongoose'
import type { Contact as TContact } from '../utils/types'

const ContactSchema = new Schema<TContact>({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
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
        default: Date.now,
    },
})

export default mongoose.model('Contact', ContactSchema)
