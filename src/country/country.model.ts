import mongoose, { Schema } from 'mongoose'
import type { Country as TCountry } from '../utils/types'

const CountrySchema = new Schema<TCountry>({
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

export default mongoose.model('Country', CountrySchema)
