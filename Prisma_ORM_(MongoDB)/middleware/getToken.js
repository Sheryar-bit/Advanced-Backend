const jwt = require('jsonwebtoken');

const getJwtToken = function(userId) {
    return jwt.sign({
        userId: userId
    }, process.env.JWT_SECRET, {expiresIn: '1 day'})
}

module.exports = getJwtToken;

