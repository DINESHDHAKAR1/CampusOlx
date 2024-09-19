const mongoose = require("mongoose")

const offerSchema = new mongoose.Schema({
    buyerEmail: {
        type: String,
        required: true
    },
    contactNum: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    }
})

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    sellerEmail: {
        type: String,
        required: true
    },
    offers: [{
        type: offerSchema,
        required: true
    }]
})

module.exports = mongoose.model("Product", productSchema);