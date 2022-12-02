const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
require('./db');
const path  =require('path');

// import route 
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const homePageRoute = require("./routes/homePageRoute");

const app = express();
dotenv.config(); 

// import middleware
const authMiddleware = require('./middleware/authMiddleware');

// middleware
app.use(express.static(path.join(__dirname, "../uploads")));
app.use(cors());
app.use(express.json());

// route 
app.get('/',authMiddleware,  (req ,res) => {
    res.json({message: "server is running"});
});

// auth 
app.use('/auth', userRoute);
app.use('/product', productRoute);
app.use('/homepage', homePageRoute);

app.listen(process.env.PORT, () => {
    console.log("Server is running on PORT = " + process.env.PORT);
});