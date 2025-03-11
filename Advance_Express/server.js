const express = require('express');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json())

app.listen(PORT, function() {
    console.log(`Server is running on ${PORT}`);
})