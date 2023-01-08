const router = require('express').Router()
const controller = require('../controllers/MealController')

// Create new meal
router.post('/', controller.createMeal)

// Get all meals
router.get('/', controller.getAllMeals)

// Get meal by id
router.get('/:id', controller.getMealById)

// Update meal
router.put('/:id', controller.updateMeal)

// Delete meal
router.delete('/:id', controller.deleteMeal)

module.exports = router
