//const { Prisma } = require('@prisma/client/extension');
const prisma = require('../Database/db_config.js');
const { status } = require('express/lib/response');


const createUser = async function(req, res) {
    try {
        const {name, email, password} = req.body;
        if(!prisma) {
            return res.status(500).json({message: "Database connection failed"});
        }
        if (!email) {
            return res.status(400).json({message: "Email is required"});
        }
        const findUser = await prisma.user.findUnique({
            where: { email }

        });
            
        if(findUser) {
            return res.status(400).json({message: "User already exists"});
        }
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        });
        return res.status(201).json({message: "User created successfully", user: newUser});

    }catch(err) {
        console.log("ERROR!", err)
        return res.status(500).json({ message: "Server error", error: err.message });
    }
}

//Updating user by Id

const updateUser = async function (req, res) {
    try{
        const userID = req.params.id;
        const{name, email, password} = req.body;
        
        await prisma.user.update({
            where: {id:Number(userID)},
            data: {
                name,
                email,
                password
            }
        })
        return res.status(200).json({message: "User updated successfully"});

    }catch(error){
        console.log("error!", error);
        
    }
}

//deleting user by Id 

const deleteUser = async function(req, res) {
    try{
        const userID = req.params.id;
        await prisma.user.delete({
            where:{id: Number(userID)}
        })
        return res.status(200).json({message: "User deleted successfully"});
    }
    
    catch(error) {
        console.log("error!", error);
        return res.status(500).json({message: "User Cant be deleted", error: error.message})
    }
}

//Gettin user
const getUser = async function (req, res) {
    const userID = req.params.id;
    try{
        if(!userID) {
            return res.status(404).json({message: "User not found"})
        }
        const GetUser = await prisma.user.findUnique({          
            where: {id: Number(userID)},

            //The below code will show you the user and the post that he has posted with likes count and th title of the post
            include: {
                posts: {
                    select: {
                        title: true,
                        likes_count: true
                    }
                }
                }

        })
        return res.status(200).json({message: 'User fetched', GetUser});

    }
    catch(error){
        console.log("error!", error);
        return res.status(500).json({message: "User Not Found", error: error.message})

    }
}


module.exports = {
    createUser,
    updateUser,
    deleteUser,
    getUser
}
