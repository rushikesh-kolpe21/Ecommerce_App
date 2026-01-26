const express = require('express');
const { registerUser, loginUser, loginAdmin } = require('../controllers/userController');

const userRouter = express.Router();

// user registration route
userRouter.post('/register', registerUser);

// user login route
userRouter.post('/login', loginUser);

// admin login route
userRouter.post('/admin', loginAdmin);

module.exports = userRouter;
