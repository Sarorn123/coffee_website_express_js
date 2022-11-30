const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    product_picture: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    price: {
        type: String,
        required: true,
    },
    description_kh: {
        type: String,
    },
    description_en: {
        type: String,
    },

}, { timestamps: true });

module.exports = mongoose.model('products', ProductSchema);