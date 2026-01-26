import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

import Stripe from "stripe";

// global variable for
const currency = "INR";
const deliveryCharge = 49;

// gateway for
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// placing orders using COD method
const placeOrderCOD = async (req, res) => {
    try {
        const { items, amount, address } = req.body;
        const userId = req.userId; // from auth middleware

        if (!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ success: false, message: 'No items in order' });
        }

        // create new order document
        const newOrder = new orderModel({
            userId,
            items,
            address,
            amount,
            PaymentMethod: "COD",
            status: 'Pending',
            payment: false,
        });

        await newOrder.save();
        await userModel.findByIdAndUpdate(userId, { cartData: {} });
        res.json({ success: true, message: "Order placed successfully", orderId: newOrder._id });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// placing orders using Stipe method
const placeOrderStripe = async (req, res) => {
    try {
         const { items, amount, address } = req.body;
         const userId = req.userId; // from auth middleware

         const {origin} = req.headers;

        //  order data
         // create new order document
        const newOrder = new orderModel({
            userId,
            items,
            address,
            amount,
            PaymentMethod: "Stripe", 
            payment: false,
        });

         await newOrder.save();

        // create stripe session
            const line_items = items.map((item) => ({
                price_data: {
                    currency: currency,
                    product_data: {
                        name: item.name,
                    },
                    unit_amount: item.price * 100,
                },
                quantity: item.quantity,
            }));
            // adding delivery charges as a separate item
            line_items.push({
                price_data: {
                    currency: currency,
                    product_data: {
                        name: "Delivery Charges",
                    },
                    unit_amount: deliveryCharge * 100,
                },
                quantity: 1,
            });

            const session = await stripe.checkout.sessions.create({
                success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
                cancel_url: `${origin}/verify?canceled=true&orderId=${newOrder._id}`,
                line_items,
                mode: 'payment',
            });
            res.json({ success: true, url: session.url });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
        
    }
};

// verfiy payment and update order status
const verifyStripePayment = async (req, res) => {
    try {
        const { orderId, success } = req.body;
        const userId = req.userId; 
        if (success == 'true' || success === true) {
            await orderModel.findByIdAndUpdate(orderId, { status: 'Confirmed', payment: true });
            await userModel.findByIdAndUpdate(userId, { cartData: {} });
            res.json({ success: true, message: 'Payment verified and order confirmed' });
    } else {
        await orderModel.findByIdAndDelete(orderId, { status: 'Cancelled', payment: false });
        res.json({ success: false, message: 'Payment failed or cancelled' });
    }
} catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
        
    }
}

// placing orders using Razorpay
const placeOrderRazorpay = async (req, res) => {};

// all orders of admin panel
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({ success: true, orders });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// update order status by admin planel
const updateOrderStatus = async (req, res) => {
    try{
        const { orderId, status } = req.body;
        await orderModel.findByIdAndUpdate(orderId, { status });
        res.json({ success: true, message: "Order status updated successfully" });
    }
    catch(error){
        console.log(error);
        res.json({ success: false, message: error.message });
    }                        
}

// user orders data for frontend
const getUserOrders = async (req, res) => {
   try {
     const userId = req.userId; // from auth middleware
     
     if (!userId) {
       return res.status(401).json({ success: false, message: 'Unauthorized' });
     }
     
     const orders = await orderModel.find({userId});
     res.json({success:true, orders});

   } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
   }
};



export {
    placeOrderCOD,
    placeOrderStripe,   
    placeOrderRazorpay,
    getAllOrders,
    getUserOrders,
    updateOrderStatus,
    verifyStripePayment
};