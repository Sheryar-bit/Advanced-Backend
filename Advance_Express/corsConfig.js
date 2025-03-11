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
            if(!origin || allowedorigin.indexOf(origin) !== -1){
                return callback(null, true) //giving permission
            } else {
                return callback(new Error('Not allowed by CORS'))
            }
        },

        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Accept'
        ],
        //expose the response to the client
        exposeHeaders: ['Content-Range', 'ETag'],

        //Credentials:
        credentials: true, //This will enable support to cookies
        //OptionSuccessstatusCode:
        optionsSuccessStatus: 204 //If you want to return a 204 status code instead
    })
}

module.exports = { configcors };