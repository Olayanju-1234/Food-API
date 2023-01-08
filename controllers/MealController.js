const Meals = require('../models/Meals')

// Create new Meal
const createMeal = async (req, res) => {
    const newMeal = new Meals(req.body)
    try {
        const meal = await newMeal.save()
        res.status(201).json(meal)
    }
    catch (error) {
        res.status(500).json(error)
    }
}



// Get all Meals for a restaurant
// Create a query string for the restaurant name
const getAllMeals = async (req, res) => {
    const query = req.query.restaurant
    try {
        const meals = query ? await Meals.find({restaurantId : query}) : await Meals.find()
        res.status(200).json(meals)
    }
    catch (error) {
        res.status(500).json(error)
    }
}

// Get Meal by ID
const getMealById = async (req, res) => {
    try {
        const meal = await Meals.findById(req.params.id)
        res.status(200).json(meal)
    }
    catch (error) {
        res.status(500).json(error)
    }
}

// Update Meal
const updateMeal = async (req, res) => {
    try {
        const meal = await Meals.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(meal)
    }
    catch (error) {
        res.status(500).json(error)
    }
}

// Delete Meal
const deleteMeal = async (req, res) => {
    try {
        await Meals.findByIdAndDelete(req.params.id)
        res.status(200).json('Meal deleted')
    }
    catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    createMeal,
    getAllMeals,
    getMealById,
    updateMeal,
    deleteMeal
}

