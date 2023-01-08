const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MealSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    restaurantId: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    }
}, {timestamps: true})

module.exports = mongoose.model('Meal', MealSchema)
