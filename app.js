const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')
const dotenv = require('dotenv')
const morgan = require('morgan')
const errorHandler = require('./middleware/error')

// Routes
const authRoutes = require('./routes/auth')
const usersRoutes = require('./routes/users')
const mealsRoutes = require('./routes/meals')
const restaurantsRoutes = require('./routes/restaurants')
const ordersRoutes = require('./routes/orders')

// Load env vars
dotenv.config({path: './config/config.env'})

// Connect to database
connectDB();

// Init express
const app = express()

// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Body parser
app.use(express.json())

// Enable CORS
app.use(cors())

// Set global variable
app.use(function (req, res, next) {
    res.locals.user = req.user || null
    next()
})

// Mount routers
app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/meals', mealsRoutes)
app.use('/api/restaurants', restaurantsRoutes)
app.use('/api/orders', ordersRoutes)

// Error handler
// app.use(errorHandler)

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))


