const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        if(file.fieldname === "logo"){
            const logo_path = file.originalname + Date.now() + ".jpg";
            req.body.logo_path = logo_path;
            cb(null, logo_path);
        }else{
            const background_image_path = file.originalname + Date.now() + ".jpg";
            req.body.background_image_path = background_image_path;
            cb(null, background_image_path);
        }
    }
})

const upload = multer({ storage: storage })
.fields(
    [
        {
            name:'logo',
            maxCount:1
        },
        {
            name: 'background_picture', 
            maxCount:1
        }
    ]
);

module.exports = {
    upload,
}
