const router = require('express').Router()

const controller = require('../controllers/RestaurantsController')
// Create new restaurant
router.post('/', controller.createRestaurant)

// Get all restaurants
router.get('/', controller.getAllRestaurants)

// Get restaurant by id
router.get('/:id', controller.getRestaurantById)

// Update restaurant
router.put('/:id', controller.updateRestaurant)

module.exports = router