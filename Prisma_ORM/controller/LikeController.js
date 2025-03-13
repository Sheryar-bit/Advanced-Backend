//const { Prisma } = require('@prisma/client/extension');
const prisma = require('../Database/db_config.js');
const { status } = require('express/lib/response');


const createlike = async function(req, res) {
    try {
        const {user_id ,post_id, likes} = req.body;
        if(!prisma) {
            return res.status(500).json({message: "Database connection failed"});
        }
        if (!user_id) {
            return res.status(400).json({message: "user Not found"});
        }
        await prisma.post.update({
            where: { id: post_id },
            data: {
                likes_count:{
                    increment: 1
                }
            }
        })
        const newlike = await prisma.like.create({
            data: {
                user_id: Number(user_id),
                post_id: Number(post_id),
                likes,
            }
        });
        return res.status(201).json({message: "Post Liked successfully", user: newlike});

    }catch(err) {
        console.log("ERROR!", err)
        return res.status(500).json({ message: "Liked not uploaded", error: err.message });
    }
}

//Updating user by Id

const updatelike = async function (req, res) {
    try{
        const likeID = req.params.id;
        const{user_id, post_id, likes} = req.body;
        
        await prisma.like.update({
            where: {id:Number(likeID)},
            data: {
                user_id: Number[user_id],
                post_id: Number(post_id),
                likes: Number(likes)
            }
        })
        return res.status(200).json({message: "like updated successfully"});

    }catch(error){
        console.log("like Not Updated!", error);
        
    }
}

//deleting Post by Id 

const Deletelike = async function(req, res) {
    try{
        const likeID = req.params.id;
        await prisma.like.delete({
            where:{id: Number(likeID)}
        })
        await prisma.post.update({
            where: { id: post_id },
            data: {
                likes_count:{
                    decrement: 1
                }
            }
        })
        return res.status(200).json({message: "Like deleted successfully"});
    }
    
    catch(error) {
        console.log("error!", error);
        return res.status(500).json({message: "Lkes Can Not be deleted", error: error.message})
    }
}

//Gettin Post By ID
const getlikes = async function (req, res) {
    const likeID = req.params.id;
    try{
        if(!likeID) {
            return res.status(404).json({message: "likes not found"})
        }
        const Getlikes = await prisma.like.findUnique({
            where: {id: Number(likeID)}

        })
        return res.status(200).json({message: 'Likes fetched', Getlikes});

    }
    catch(error){
        console.log("error!", error);
        return res.status(500).json({message: "Like Not Found", error: error.message})

    }
}


module.exports = {
    createlike,
    updatelike,
    Deletelike,
    getlikes,
}
