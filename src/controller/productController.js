const Product = require("../model/Product");
const fs = require('fs');
const { promisify } = require('util');

const unlinkAsync = promisify(fs.unlink);

const productController = {

    getAllProduct: async (req, res) => {
        const products = await Product.find();
        res.status(200).json(products)
    },

    addProduct: async (req, res) => {
        try {
            const {
                product_picture,
                name,
                price,
                description_kh,
                description_en,
            } = req.body;

            const newProduct = new Product({
                product_picture,
                name,
                price,
                description_kh,
                description_en,
            });

            await newProduct.save();

            res.status(201).json(newProduct);

        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const product = await Product.findById(req.params.id);
            const deleteProduct = await Product.findByIdAndDelete(req.params.id);
            await unlinkAsync("uploads\\"+product.product_picture).catch(() => {});
            res.status(200).json(deleteProduct);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    updateProduct: async (req, res) => {
        try {

            const {
                product_picture,
                name,
                price,
                description_kh,
                description_en,
            } = req.body;

            const data = {
                product_picture,
                name,
                price,
                description_kh,
                description_en,
            }
            await Product.findByIdAndUpdate(req.params.id, data);
            const product = await Product.findById(req.params.id);
            res.status(201).json(product);

        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    getProduct:  async(req, res) => {
        try {
            const product = await Product.findById(req.params.id);
           
            res.status(201).json(product);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

}

module.exports = productController;