const express = require('express');
const dotenv = require('dotenv');
const { router } = require ('./routes/UserRoutes');

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
dotenv.config();

app.get('/', function(req, res) {
    res.send('Main end point');
});

app.use('/api', router)

const PORT = 3000
app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`);
})