const mongoose = require('mongoose')

const Schema = mongoose.Schema

const OrderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    restaurantId: {
        type: Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    orderItems: [{ 
        mealId: {
            type: Schema.Types.ObjectId,
            ref: 'Meal'
        },
        quantity: {
            type: Number,
            required: true
        } 
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Order', OrderSchema)


