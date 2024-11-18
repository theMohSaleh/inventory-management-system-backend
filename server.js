// Modules
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const verifyToken = require('./middleware/verify-token');

// Controllers 
const testJWTRouter = require('./controllers/test-jwt');
const usersRouter = require('./controllers/users');
const profilesRouter = require('./controllers/profiles');
const itemsController = require('./controllers/items');
const activityController = require('./controllers/activities');

// Middleware
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(morgan('dev'))
app.use(cors());
app.use(express.json());

// Routes
app.use('/test-jwt', testJWTRouter);
app.use('/users', usersRouter);
app.use('/profiles', profilesRouter);

// Protected Routes
app.use(verifyToken);

app.use('/items', itemsController)
app.use('/logs', activityController)

app.listen(3000, () => {
    console.log('The express app is ready!');
});