const express = require('express');
const { addToCart, updateCart, getUserCart } = require('../controllers/cartController');
const authMiddleware = require('../middleware/auth');

const cartRoute = express.Router();

// route to add product to cart
cartRoute.post('/add', authMiddleware, addToCart);

// route to get cart items of user
cartRoute.get('/get', authMiddleware, getUserCart);

// route to update item quantity in cart
cartRoute.post('/update', authMiddleware, updateCart);

module.exports = cartRoute;