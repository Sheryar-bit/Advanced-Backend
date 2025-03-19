const express = require('express');
const { createlike, updatelike, Deletelike, getlikes } = require('../controller/LikeController');
const app = express()

const likerouter = express.Router();

likerouter.post('/like', createlike) // Create Post
likerouter.put('/like/:id', updatelike) //update post by IDr
likerouter.delete('/like/:id', Deletelike) //delete post By Id
likerouter.get('/like/:id', getlikes) //Fetching pist by ID

module.exports = {
    likerouter
}