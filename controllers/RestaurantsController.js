const Restaurants = require('../models/Restaurants')

// Create restaurant 
const createRestaurant = async (req, res) => {
    const newRestaurant = new Restaurants(req.body);

    try {
        const savedRestaurant = await newRestaurant.save()
        res.status(200).json(savedRestaurant)
    } catch (error) {
        res.status(500).json(error)
    }
}

// Get all restaurants
const getAllRestaurants = async (req, res) => {
    const limitQuery = req.query.limitQuery
    try {
        const restaurants = limitQuery ? await Restaurants.find().limit(5) : await Restaurants.find()
        res.status(200).json(restaurants)
    } catch (err) {
        res.json(500).json(err)
    }
}

// Get Restaurant By Id
const getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurants.findById(req.params.id)
        res.status(200).json(restaurant)
    } catch (err) {
        res.status(500).json(err)
    }
}

// Update a restaurant
const updateRestaurant = async (req, res) => {
    try {
        const updateRestaurants = await Restaurants.findByIdAndUpdate(req.params.id, 
            {
                $set: req.body,
            },
            {new : true}
            );
            res.status(200).json(updateRestaurants);
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {
    createRestaurant,
    getAllRestaurants,
    getRestaurantById,
    updateRestaurant
}