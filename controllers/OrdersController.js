const Orders = require('../models/Orders');

// Create new order
const createOrder = async (req, res) => {
    const newOrder = new Orders(req.body);

    try {
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder)
    } catch (error) {
        res.status(500).json(error)
    }
}

// Get order details
const getOrderDetails = async (req, res) => {
    try {
        const order = await Orders.findById(req.params.id).populate('userId', 'username createdAt updatedAt').populate({path : "orderItems",
    populate : {
        path : "mealId",
        model : "Meal",
        select : "name price"
    }})
        res.status(200).json(order)
    } catch (err) {
        res.status(500).json(err)
    }
}

// Update order status
const updateOrderStatus = async (req, res) => {
    try {    
        const updateOrder = await Orders.findByIdAndUpdate(req.params.id,
            {
                $set: {status: req.body.status}},
            {new : true}
            );
            res.status(200).json(updateOrder);
    } catch (err) {
        res.status(500).json(err)
    }
}

// Get all orders for a restaurant
const getAllOrdersForRestaurant = async (req, res) => {
    try {
        const orders = await Orders.find({restaurantId: req.params.id}).populate('userId', 'username createdAt updatedAt').populate({path : "orderItems",
    populate : {
        path : "mealId",
        model : "Meal",
        select : "name price"
    }})

        res.status(200).json(orders)
    } catch (err) {
        res.status(500).json(err)
    }
}



module.exports = {
    createOrder,
    getOrderDetails,
    updateOrderStatus,
    getAllOrdersForRestaurant
}


