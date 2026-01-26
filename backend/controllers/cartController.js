const userModel = require("../models/userModel");

// add  product to user cart
const addToCart = async (req, res) => {
    try {
    
        const {itemId, size, } = req.body;
        const userId = req.userId;

        // fetch user data from database
        const userData = await userModel.findById(userId);
        
        if (!userData) {
            return res.json({success:false, message:"User not found"});
        }
        
        // get cart data of user (initialize if doesn't exist)
        let cartData = userData.cartData || {};

        if(cartData[itemId]){
            // if item already present in cart then update quantity
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1;
            } else {
                // size not present for the item
                cartData[itemId][size] = 1;
            }   
        } else {
            // item not present in cart
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        // save updated cart data to database
        await userModel.findByIdAndUpdate(userId, {cartData});
        res.json({success:true, message:"Product added to cart successfully"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

// //update product quantity in user cart
const updateCart = async (req, res) => {
    
    try {
        const {itemId, size, quantity} = req.body;
        const userId = req.userId;

        // fetch user data from database
        const userData = await userModel.findById(userId);
        
        if (!userData) {
            return res.json({success:false, message:"User not found"});
        }
        
        // get cart data of user (initialize if doesn't exist)
        let cartData = userData.cartData || {};
        
        // update quantity of specific item and size
        cartData[itemId][size] = quantity;

        // save updated cart data to database
        await userModel.findByIdAndUpdate(userId, {cartData});
        res.json({success:true, message:"Cart updated successfully"});

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

// get user cart details
const getUserCart = async (req, res) => {
    try {
        const userId = req.userId;
        console.log("Getting cart for userId:", userId);

        // fetch user data from database
        const userData = await userModel.findById(userId);
        
        if (!userData) {
            console.log("User not found for userId:", userId);
            return res.json({success:false, message:"User not found"});
        }

        // get cart data of user
        let cartData = userData.cartData || {};
        res.json({success:true, cartData});

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

module.exports = {
    addToCart,
    updateCart,
    getUserCart
};