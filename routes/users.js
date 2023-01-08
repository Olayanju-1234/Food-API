const router = require('express').Router()
const controller = require('../controllers/UsersControllers')
const {verifyToken, verifyTokenAndAuthorization, ownerVerification, verifyTokenAndAuth} = require('./verifyToken')


// Update User
router.put('/:id', controller.updateUser)

// Delete User
router.delete('/:id', verifyTokenAndAuth, controller.deleteUser)

// Get User
router.get('/:id', ownerVerification,  controller.getUser)

// Get All Users
router.get('/', ownerVerification, controller.getAllUsers)

module.exports = router