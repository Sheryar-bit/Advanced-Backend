const cors = require('cors');

const configcors = function() {
    return cors({
        //Tells that which origin are allowed to access the API
        origin: function(origin, callback) {
            const allowedorigin = [
                'http://localhost:3000', //local deelopment
                'httpx://MycostumDomain', //production custom domain
            ]
            // if the origin is not in the allowed list :
            if(!origin || allowedorigin.indexOf(origin !== -1)){
                return callback(null, true) //giving permission
            } else {
                return callback(new Error('Not allowed by CORS'))
            }
        }
    })
}