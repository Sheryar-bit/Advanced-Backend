const getJwtToken = require('../middleware/getToken');

const cookieToken = function(user, res){
    const token = getJwtToken(user.id);
    const options = {
        expires: new Date(Date.now() + 900000),
        httpOnly: true,
    }
    user.password = undefined;
    res.status(200).cookie('token', token, options).json({
        success: true,
        token,
        user
    });
}

module.exports = cookieToken;