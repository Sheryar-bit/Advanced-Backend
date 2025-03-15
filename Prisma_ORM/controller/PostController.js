//const { Prisma } = require('@prisma/client/extension');
const prisma = require('../Database/db_config.js');
const { status } = require('express/lib/response');


const createPost = async function(req, res) {
    try {
        const {user_id ,title, discription} = req.body;
        if(!prisma) {
            return res.status(500).json({message: "Database connection failed"});
        }
        if (!user_id) {
            return res.status(400).json({message: "user Not found"});
        }
        const newPost = await prisma.post.create({
            data: {
                user_id: Number(user_id),
                title: title,
                discription: discription
            }
        });
        return res.status(201).json({message: "Post created successfully", user: newPost});

    }catch(err) {
        console.log("ERROR!", err)
        return res.status(500).json({ message: "Post not uploaded", error: err.message });
    }
}

//Updating user by Id

const updatePost = async function (req, res) {
    try{
        const postID = req.params.id;
        const{user_id, discription, title} = req.body;
        
        await prisma.post.update({
            where: {id:Number(postID)},
            data: {
                user_id: Number[user_id],
                 discription,
                 title
            }
        })
        return res.status(200).json({message: "Post updated successfully"});

    }catch(error){
        console.log("Post Not Updated!", error);
        
    }
}

//deleting Post by Id 

const DeletePost = async function(req, res) {
    try{
        const postID = req.params.id;
        await prisma.post.delete({
            where:{id: Number(postID)}
        })
        return res.status(200).json({message: "Post deleted successfully"});
    }
    
    catch(error) {
        console.log("error!", error);
        return res.status(500).json({message: "Post Can Not be deleted", error: error.message})
    }
}

//Gettin Post By ID
const getPost = async function (req, res) {
    const postID = req.params.id;

    /*Pagination is used in APIs to limit the number of results returned per request.

page → Specifies which page of results to retrieve.
limit → Specifies how many results to return per page.*/
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10

    try{
        if(!postID) {
            return res.status(404).json({message: "Post not found"})
        }
        // Ensure page is at least 1
        if (page <= 0) { 
            page = 1 
        }
        
// Ensure limit is between 1 and 100
        if (limit <=0 || limit > 100) {
             limit = 10 
            } 
            const skip = (page - 1) * limit;

        const GetPost = await prisma.post.findUnique({
            where: {id: Number(postID)},
            skip: skip,
            take: limit,
            include: {
                likes: true
            }

        })
        
        const getpostCounts = await prisma.count()
        const totalpages = Math.ceil(getpostCounts / limit)
        return res.status(200).json({message: 'Post fetched', meta: {totalpages, currentPage:page, limit:limit}, GetPost});

    }
    catch(error){
        console.log("error!", error);
        return res.status(500).json({message: "Post Not Found", error: error.message})

    }
}
 



module.exports = {
    createPost,
    updatePost,
    DeletePost,
    getPost,
}
