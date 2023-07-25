const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    currentPrice: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    imgUrl: {
        type: Number,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    productID: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Products', productsSchema)