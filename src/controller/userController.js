const bcrypt = require('bcrypt');
const User = require('../model/User');
const {generatToken} = require('../function/authFunction')

const userController = {
    register: async (req, res) => {
        try {
            const {
                username,
                email,
                password,
                profile_picture,
                role,

            } = req.body;

            const salt = await bcrypt.genSalt();
            const hasedPassword = await bcrypt.hash(password, salt);

            const newUser = new User({
                username,
                email,
                password: hasedPassword,
                profile_picture,
                role,
            });

            await newUser.save();
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    login: async (req, res) => {

        try {

            const { email, password } = req.body;
            const user = await User.findOne({email});
            if(!user) return res.status(401).json({message: "UnAuthentication"});
            const compare = await bcrypt.compare(password, user.password);
            if(!compare) return res.status(401).json({message: "Password Not Correct"});
            const token = generatToken(user);
            res.status(200).json({
                user: user,
                token: token,
                message: 'login success',
            })
            
        } catch (error) {
            
        }

    }
}
module.exports = userController;