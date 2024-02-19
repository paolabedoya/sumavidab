import mongoose, { Schema } from 'mongoose'

const menuRecommendationSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    breakfast: {
        type: String,
        required: true,
    },
    brunch: {
        type: String,
        required: true,
    },
    lunch: {
        type: String,
        required: true,
    },
    afternoon_snack: {
        type: String,
        required: true,
    },
    dinner: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
        required: true,
    },
    professional_id: {
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

export default mongoose.model('MenuRecommendations', menuRecommendationSchema)