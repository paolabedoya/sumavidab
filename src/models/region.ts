import mongoose, { Schema } from 'mongoose'
import type { Region as TRegion } from '../utils/types'

const regionSchema = new Schema<TRegion>({
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
        default: Date.now,
    },
})

export default mongoose.model('Region', regionSchema)