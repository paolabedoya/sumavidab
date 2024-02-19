import mongoose, { Schema } from 'mongoose'

const jobSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    // the name of the job is an enum
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