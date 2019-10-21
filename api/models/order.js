const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    product: {type: mongoose.Schema.Types.ObjectId , ref: 'Product'},
    quantity: {type: Number, default: 1},
    productImage: {type: String, require: false},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    ownerName: {type: String, require: true},
    descriptionRegardingAvailability: {type: String, require: true},
    fuelType: {type: String, require: true},
    seats: {type: Number, require: true},
    mobileNumber: {type: String, require: true}
});

module.exports = mongoose.model('Order', orderSchema);