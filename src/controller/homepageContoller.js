const HomePage = require("../model/HomePage");
const { upload } = require("../multer/uploadMultipleFile");
const fs = require('fs');
const { promisify } = require('util');
const Product = require("../model/Product");

const unlinkAsync = promisify(fs.unlink);

const homePageController = {
    addHomepage: async (req, res) => {
        try {

            const homePage = await HomePage.findOne();
            if(homePage){
                return res.status(400).json({message: "Homepage Already Have please Update "})
            }

            const {
                logo_path,
                title,
                background_image_path,
                banner_title
            } = req.body;

            const setHomepage = new HomePage({
                logo_path,
                title,
                background_image_path,
                banner_title
            });
            await setHomepage.save();
            res.status(201).json(setHomepage);

        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },
    updateHomepage: async (req, res) => {
        try {
            const {
                logo_path,
                title,
                background_image_path,
                banner_title
            } = req.body;

            const homePage = await HomePage.findById(req.params.id);
            await unlinkAsync("uploads\\"+homePage.background_image_path).catch(() => {});
            await unlinkAsync("uploads\\"+homePage.logo_path).catch(() => {});

            homePage.title = title;
            homePage.logo_path = logo_path;
            homePage.background_image_path = background_image_path;
            homePage.banner_title = banner_title;
            await homePage.save();

            res.status(200).json(homePage);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    },

    getHomepage: async (req, res) => {
        try {
            const homePage = await HomePage.findOne();
            const products = await Product.find().sort('-createdAt').limit(3);
            const result = {
                _id: homePage.id,
                logo_path: homePage.logo_path,
                background_image_path: homePage.background_image_path,
                title: homePage.title,
                banner_title: homePage.banner_title,
                products: products,
            }
            return res.status(200).json(result);
        } catch (error) {
            res.status(400).json({message: error.message});
        }
    }
}

module.exports = homePageController;