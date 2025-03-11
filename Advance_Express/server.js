const express = require('express');
require('dotenv').config();
const {configcors} = require('./corsConfig')
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(configcors());

app.get('/', (req, res) => {
    res.send('Practice')
})

app.listen(PORT, function() {
    console.log(`Server is running on ${PORT}`);
})