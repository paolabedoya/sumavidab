import mongoose, { Schema } from 'mongoose'

const groupSchema = new Schema({
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

export default mongoose.model('Group', groupSchema)