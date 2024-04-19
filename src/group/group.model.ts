import mongoose, { Schema } from 'mongoose'
import type { Group as TGroup } from '../utils/types'

const GroupSchema = new Schema<TGroup>({
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

export default mongoose.model('Group', GroupSchema)
