const express = require("express");
const multer = require("multer");
const productController = require("../controller/productController");
const router = express.Router();

const storage = multer.diskStorage({
destination: function (req, file, cb) {
    cb(null, 'uploads')
},
filename: function (req, file, cb) {
    const product_picture = file.originalname + Date.now() + ".jpg";
    req.body.product_picture = product_picture;
    cb(null, product_picture);
}
})
  
const upload = multer({ storage: storage })

router.post('/add-product', upload.single('product_picture') ,productController.addProduct);
router.delete('/delete-product/:id' ,productController.deleteProduct);
router.put('/update-product/:id',upload.single('product_picture') ,productController.updateProduct);
router.get('/get-all-product' ,productController.getAllProduct);
router.get('/get-product/:id' ,productController.getProduct);

module.exports = router;