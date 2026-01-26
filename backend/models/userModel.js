const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,   
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: { 
        type: String,
        required: true
    },
    cartData: {
        type: Object,
        default: {}
    },
}, {minimize: false, timestamps: true});

// model export 
const userModel = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = userModel;