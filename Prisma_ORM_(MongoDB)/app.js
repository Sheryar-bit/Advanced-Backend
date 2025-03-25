const cookieParser = require('cookie-parser');
const express = require('express');
require('dotenv').config()
const userRoute = require('./Routes/userRoutes')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser())

app.get('/', function(req, res) {
    res.send('Working!');

})

app.use('/api', userRoute)

const PORT = process.env.PORT || 5000

app.listen(PORT, function() {
    console.log('Server running on port 3000');
})