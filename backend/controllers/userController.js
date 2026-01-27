const userModel = require("../models/userModel");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// function to create JWT token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '2d',
    });
}


// route for user registration
const registerUser = async (req, res) => {
    try {
         const {userName, email, password} = req.body;

         // checking if user already exists or not
         const exists = await userModel.findOne({email});
         if(exists){
            return res.status(200).json({success: false, message: 'User already exists'});
         }

         // validating password length and email
         if(!validator.isEmail(email)){
            return res.status(200).json({success: false, message: 'Please enter a valid email'});
         }
         if(password.length < 6){
            return res.status(200).json({success: false, message: 'Password must be at least 6 characters long'});
         }

        //  hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

         // creating new user
         const newUser = new userModel({
            name:userName,
            email,
            password : hashedPassword
         });

         // saving new user to database
         await newUser.save();
         
        //  token generation can be added here
            const token = createToken(newUser._id)
            res.json({success:true, token})

    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}


// route for user login 
const loginUser = async (req, res) => {
    // res.json({ message: 'User login successful' });
    try {

        const {email, password} = req.body;

        // if user not exit
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(200).json({success: false, message: "User not found. Please check your email"});
        }
        // if user exit with matching password
        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch){
            // generate token
            const token = createToken(user._id);
            res.json({success:true, token});
        } else {
            // password doesn't match
            return res.status(200).json({success: false, message: "Invalid password"});
        }
    } catch (error) {
         console.log(error);
        res.json({success:false, message:error.message})
    }
}

// route for admin login
const loginAdmin = async (req, res) => {
    try {
         const {email, password} = req.body;

         // checking admin credentials from .env file
            if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
                const token = jwt.sign({ email, password }, process.env.JWT_SECRET, 
                    { expiresIn: '2d' });       
                return res.json({success:true, token}); // send token to frontend
            } else{
                res.json({success:false, message:'Invalid admin credentials'});
            }
    } catch (error) {
         console.log(error);                                     
        res.json({success:false, message:error.message});           
    }
}


module.exports = {
    loginUser,
    registerUser,
    loginAdmin,  
};