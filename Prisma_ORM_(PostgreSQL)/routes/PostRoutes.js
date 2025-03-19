const express = require('express');
const { createPost, updatePost, DeletePost, getPost } = require('../controller/PostController');
const app = express()

const Postrouter = express.Router();

Postrouter.post('/post', createPost) // Create Post
Postrouter.put('/post/:id', updatePost) //update post by IDr
Postrouter.delete('/post/:id', DeletePost) //delete post By Id
Postrouter.get('/post/:id', getPost) //Fetching pist by ID

module.exports = {
    Postrouter
}