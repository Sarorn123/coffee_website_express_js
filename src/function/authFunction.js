const jwt = require('jsonwebtoken');

const generatToken= (user) => {

    return jwt.sign({
        data: user
    }, process.env.SECRET, {
        expiresIn: '1d'
    });
}

module.exports = {
    generatToken,
}