const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: {
        type :String,
        required : true,
        min : 3,
        max: 10,
    },
    profile_picture: {
        type :String,
        required : true,
        default: null,
    },  
    email: {
        type :String,
        required : true,
        unique: true,
    },
    password: {
        type :String,
        required : true,
    },
    role: {
        type : String,
        required : true,
        default: "Admin"
    }

}, {timestamps : true});

module.exports = mongoose.model('users', UserSchema);