const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://pratice:pratice@cluster0.d3mp6cf.mongodb.net/?retryWrites=true&w=majority", (err) => {
    if (err) return console.log(err.message);
    console.log("Connected To Db");
});