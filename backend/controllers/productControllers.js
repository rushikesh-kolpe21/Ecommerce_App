
const cloudinary = require("cloudinary").v2;
const { single } = require("../middleware/multer");
const productModel = require("../models/productModel");

// fucntion for add product
const addProduct = async (req, res) => {
    try{
        //
        const {name, description, price, category, subCategory, sizes, bestseller} = req.body;
        
        // Get uploaded files (upload.any() returns an array)
        const images = req.files || [];
        
        if (images.length === 0) {
            return res.status(400).json({success: false, message: 'At least one image is required'});
        }
        
       // Upload images to Cloudinary and get URLs
        let imageUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )
    
        const newProduct = new productModel({
            name, 
            description,
            price: Number(price),
            category,
            subCategory: subCategory ,
            bestseller: bestseller === 'true' ? true : false,
            sizes: sizes ? sizes.split(',').map(size => size.trim()) : [],
            image: imageUrl

        });
        await newProduct.save();
        res.status(201).json({success:true, message:'Product added successfully'}); 
    
    } catch(error){
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

// fucntion for list product
const listProduct = async (req, res) => {
    try {
        const productsList = await productModel.find({});
        res.json({success:true, productsList});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}

// Function for single product information
const singleProduct = async (req, res) => {
    try {
       const singleProduct = await productModel.findById(req.params.id);
        res.json({success:true, singleProduct});
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message});
    }
};

// fucntion for removing product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.params.id);
        res.json({success:true, message:'Product removed successfully'});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message});
    }
}


module.exports = {
    addProduct,
    listProduct,
    singleProduct,
    removeProduct,
};