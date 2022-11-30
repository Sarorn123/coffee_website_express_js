const express = require("express");
const multer = require("multer");
const userController = require("../controller/userController");
const router = express.Router();

const storage = multer.diskStorage({
destination: function (req, file, cb) {
    cb(null, 'uploads')
},
filename: function (req, file, cb) {
    const profile_picture = file.originalname + Date.now() + ".jpg";
    req.body.profile_picture = profile_picture;
    cb(null, profile_picture);
}
})
  
const upload = multer({ storage: storage })

router.post('/register', upload.single('profile_picture') ,userController.register);
router.post('/login' ,userController.login);

module.exports = router;