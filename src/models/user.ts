import mongoose, { Schema } from 'mongoose'
import type { User as TUser } from '../utils/types'

const userSchema = new Schema<TUser>({
    rol: {
        type: String,
        required: true,
        enum: ["admin", "patient", "professional"],
    },
    job_id: {
        type: Number,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
    },
    country_id: {
        type: String,
        required: true,
    },
    region: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ["f", "m"],
    },
    group_id: {
        type: String,
        required: true,
    },
    lifestyle_id: {
        type: String,
        required: true,
    },
    events: {
        type: [String],
        required: false,
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

export default mongoose.model('User', userSchema)