const express = require('express');
const { addProduct,  listProduct, removeProduct, singleProduct } = require('../controllers/productControllers');
const upload = require('../middleware/multer');
const adminAuth = require('../middleware/adminAuth');


const productRouter = express.Router();

// route to add a new product
productRouter.post('/add',adminAuth, upload.any(), addProduct);

// route to get all products
productRouter.get('/list', listProduct);  

// route to get single product information
productRouter.get('/:id', singleProduct);

// route to remove a product
productRouter.delete('/:id',adminAuth, removeProduct);

module.exports = productRouter;


