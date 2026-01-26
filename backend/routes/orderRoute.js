const express = require('express');

const { placeOrderCOD,placeOrderStripe, placeOrderRazorpay, getAllOrders, getUserOrders, updateOrderStatus,verifyStripePayment } = require('../controllers/orderController');
const authMiddleware = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

const orderRoute = express.Router();

// admin features
orderRoute.get('/all-list', adminAuth, getAllOrders);
orderRoute.post('/update-status', adminAuth, updateOrderStatus);

// payment methods
orderRoute.post('/place-order-cod', authMiddleware,   placeOrderCOD);
orderRoute.post('/place-order-stripe', authMiddleware, placeOrderStripe);
orderRoute.post('/place-order-razorpay', authMiddleware, placeOrderRazorpay);

// user orders
orderRoute.get('/user-orders', authMiddleware, getUserOrders);

// verify stripe payment
orderRoute.post('/verify-stripe-payment', authMiddleware, verifyStripePayment);

module.exports = orderRoute;