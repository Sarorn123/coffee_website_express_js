const mongoose = require("mongoose");

const HomePageSchema = mongoose.Schema({
    logo_path: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        max: 50,
        min: 5,
    },
    background_image_path: {
        type: String,
        required: false,
    },
    banner_title: {
        type: String,
        required: true,
        max: 50,
        min: 5,
    },

}, { timestamps: true });

module.exports = mongoose.model('homepages', HomePageSchema);