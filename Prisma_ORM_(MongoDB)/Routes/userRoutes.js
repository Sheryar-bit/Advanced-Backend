const express = require('express');
const { signUp } = require('../Controllers/userController'); 

const userRoute = express.Router();

userRoute.post('/signup', signUp);

module.exports = userRoute;
