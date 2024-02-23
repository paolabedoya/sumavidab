import mongoose, { Schema } from 'mongoose'
import type { Lifestyle as TLifestyle } from '../utils/types'

const lifestyleSchema = new Schema<TLifestyle>({
    name: {
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

export default mongoose.model('Lifestyle', lifestyleSchema)