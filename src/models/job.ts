import mongoose, { Schema } from 'mongoose'
import type { Job as TJob } from '../utils/types'

const jobSchema = new Schema<TJob>({
    name: {
        type: String,
        required: true,
        enum: ["nutricionist", "psychologist", "trainer"]
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

export default mongoose.model('Job', jobSchema)