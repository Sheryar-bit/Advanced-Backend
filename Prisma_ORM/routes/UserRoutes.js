const { UserController, createUser, updateUser, deleteUser, getUser } = require('../controller/UserController');

const express = require('express');
const app = express()

const router = express.Router();

router.post('/user', createUser) // Create User
router.put('/user/:id', updateUser) //update use by IDr
router.delete('/user/:id', deleteUser) //delete user By Id
router.get('/user/:id', getUser) //Fetching user by ID

module.exports = {
    router
}