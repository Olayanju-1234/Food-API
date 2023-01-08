const mongoose = require('mongoose')

const Schema = mongoose.Schema

const RestaurantSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    typeOfFood : {
        type : String,
        required : true
    },
    userId: {
        type : Schema.Types.ObjectId,
        ref: 'User'
    },
    isOwner : {
        type : Boolean,
        required : true
    }
}, {timestamps: true})

module.exports = mongoose.model('Restaurant', RestaurantSchema)