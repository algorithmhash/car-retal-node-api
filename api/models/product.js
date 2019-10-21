const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    price: {type: Number, required: true},
    productImage: {type: String, require: true},
    ownerName: {type: String, require: true},
    descriptionRegardingAvailability: {type: String, require: true},
    fuelType: {type: String, require: true},
    seats: {type: Number, require: true},
    mobileNumber: {type: String, require: true}
});

module.exports = mongoose.model('Product', productSchema);