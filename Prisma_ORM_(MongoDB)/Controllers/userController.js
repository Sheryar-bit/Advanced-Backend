// const prisma = require('../Database/db_config');

// const cookieToken = require('../utils/cookieToken');


// const signUp = async function (req, res, next) {
//     try {
//         const { name, email, password } = req.body;
//         if( !name || !email || !password )
//             return res.status(400).json({ message: "Please fill in all fields" });

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const user = await prisma.user.create({
//             data: {
//                 name, 
//                 email,
//                 password
//             }
//         })
//         //send user a token
//         cookieToken(user, res);
        
//     } catch (error) {
        
//     }
//     next();
// }

// module.exports = signUp




const bcrypt = require('bcrypt');
const prisma = require('../Database/db_config'); 
const cookieToken = require('../utils/cookieToken'); 

const signUp = async function (req, res) {
    try {
        const { name, email, password } = req.body;

        console.log("Incoming request body:", req.body); 

        if (!name || !email || !password) {

            return res.status(400).json({ message: "Please fill in all fields" });
        }

        console.log("Checking for existing user with email:", email); 
        const existingUser = await prisma.user.findUnique({ 
            where: { email } 
        });


        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        console.log("User created successfully:", user); 
        cookieToken(user, res);

        
    } catch (error) {
        console.error("Error in signUp:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


module.exports = { signUp };
