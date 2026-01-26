import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: { type: Object, required: true }, // { itemId: { size: quantity } }
    amount: { type: Number, required: true },
    address: { type: String, required: true },
    status: { type: String, required:true, default: 'Pending' },
    PaymentMethod: { type: String, required: true },
    payment:{ type:Boolean, required:true, default:false},
    createdAt: { type: Date, default: Date.now }
});       

export default mongoose.model('Order', orderSchema);