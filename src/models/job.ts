import mongoose, { Schema } from 'mongoose'

const jobSchema = new Schema({
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