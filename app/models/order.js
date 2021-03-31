const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customerId: {
               type: mongoose.Schema.ObjectId,
               ref: 'User',
               required: true
             },
    items: {type: Object, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
    paymentType: {type: String, default: 'COD'},
    status: {type: String, default: 'order_placed'},
    paymentStatus: {type: Boolean, default: false}
}, {timestamps: true});

module.exports = mongoose.model('Order', orderSchema)