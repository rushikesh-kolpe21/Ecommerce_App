const   mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {      
        type: String,
        required: true
    },  
    price: {
        type: Number,
        required: true
    },
    image: {
        type: Array,
        required: true
    },
    category: { 
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true  
    },
    sizes: {
        type:Array,
        required:true
    },
    bestseller: {
        type: Boolean,
        default: false  
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

// modlel export
const productModel = mongoose.model.product || mongoose.model('Product', productSchema);
module.exports = productModel;