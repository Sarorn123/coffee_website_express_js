const express = require("express");
const multer = require("multer");
const router = express.Router();
const checkPermission = require('../middleware/authorization');
const verifyToken = require('../middleware/authMiddleware');
const homepageController = require("../controller/homepageContoller");

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads');
    },
    filename: function (req, file, callback) {
        if (file.fieldname === "logo") {
            const name = file.fieldname + '-' + Date.now() + file.originalname;
            req.body.logo_path = name;
            callback(null, name);
        } else {
            const name = file.fieldname + '-' + Date.now() + file.originalname;
            req.body.background_image_path = name;
            callback(null, name);
        }
    }
});
const upload = multer({ storage: storage }).fields([{
    name: 'logo', maxCount: 1
}, {
    name: 'background_picture', maxCount: 1
}]);

router.post('/add',
    verifyToken,
    checkPermission(["Admin"]),
    upload,
    homepageController.addHomepage
);

router.put('/update/:id',
    verifyToken,
    checkPermission(['Admin']),
    upload,
    homepageController.updateHomepage
);
router.get('/getHomepage' ,homepageController.getHomepage);


module.exports = router;