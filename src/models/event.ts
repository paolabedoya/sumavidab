import mongoose, { Schema } from 'mongoose'

const eventSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    venue_type: {
        type: String,
        required: true,
        enum: ["remote", "in_person"],
    },
    worker_id: {
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

export default mongoose.model('Event', eventSchema)