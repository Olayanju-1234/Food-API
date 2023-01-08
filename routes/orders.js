const router = require('express').Router()
const controller = require('../controllers/OrdersController')

// Create new order
router.post('/', controller.createOrder)

// Get order details
router.get('/:id', controller.getOrderDetails)

// Update order status
router.put('/:id', controller.updateOrderStatus)

// Get all orders for a restaurant
router.get('/restaurant/:id', controller.getAllOrdersForRestaurant)

module.exports = router
