const User = require('../models/Users')
const jwt = require('jsonwebtoken')
const CryptoJS = require('crypto-js')


// REGISTER
const registerUser = async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString(),
        permissions: req.body.permissions
    })
    try {
        const user = await newUser.save()
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
}

// LOGIN
const loginUser = async (req, res) => {
    try {
        const user = await User
            .findOne({username: req
                .body
                .username})

        !user && res.status(401).json("Wrong username or password")

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET)

        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

        originalPassword !== req.body.password && res.status(401).json("Wrong username or password")

        // Access token
        const accessToken = jwt.sign({
            id: user._id,
            permissions: user.permissions || "user" // If user has no permissions, set permissions to "user" 

        }, process.env.JWT_SEC, {expiresIn: "3d"})

        const {password, ...info} = user._doc

        res.status(200).json({...info, accessToken})
    }
    catch (error) {
        res.status(500).json(error)
    }
}

// GET USER
const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const {password, ...info} = user._doc
        res.status(200).json(info)
    } catch (error) {
        res.status(500).json(error)
    }
}

// GET ALL USERS
const getAllUsers = async (req, res) => {
    const query = req.query.new
    try {
        const users = query
            ? await User.find().sort({_id: -1}).limit(5)
            : await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}

// DELETE USER
const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User deleted")
    } catch (err) {
        res.status(500).json(err);
    }
}

// UPDATE USER
const updateUser = async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SECRET
        ).toString();
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    registerUser,
    loginUser,
    getUser,
    getAllUsers,
    deleteUser,
    updateUser
}


