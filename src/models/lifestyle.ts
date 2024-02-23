import mongoose, { Schema } from 'mongoose'

const lifestyleSchema = new Schema({
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