const express = require("express")
const { userModel } = require("../model/user.model")
require("dotenv").config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const userRouter = express.Router()

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management operations
 */

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: password123
 *     responses:
 *       200:
 *         description: Successfully registered the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Signup Successfully..🥳
 *       401:
 *         description: User already exists or signup failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: This user already exists..please try another username
 */
userRouter.post('/signup',async(req,res)=>{
    try{
         const {username,password} = req.body
         const user = await userModel.findOne({username})
         if (user){
            return res.status(401).json({msg:"This user already exit..please try to another username"})
         }
         const hash = await bcrypt.hash(password,8)
         const newUser = new userModel ({username,password:hash})

         await newUser.save()
         res.status(200).json({msg:"Signup Sucessfully..🥳"})
    }
    catch(error){
        console.log(error)
        res.status(401).json({msg:"Something went wrong to signup.."})

    }
})
/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Authenticate a user and get a token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 description: The password of the user
 *                 example: password123
 *     responses:
 *       201:
 *         description: Successfully logged in and returned a token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Login Successfully..
 *                 token:
 *                   type: string
 *                   description: JWT token for the authenticated user
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NmQ4M2Q3ZGM1N2VkNTY2OTc0MWRhNCIsImlhdCI6MTY4MTgyMDA0MywiZXhwIjoxNjgxODI3NjQzfQ.SXbhEctnPLzFnXZHeCOHQPbd_P4-WqKDheX9RP8XH4k
 *       401:
 *         description: Invalid credentials or login failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Wrong credentials.. please login again..
 */
userRouter.post("/login",async(req,res)=>{
    try{
        const {username,password}= req.body
        const isuserpresent = await userModel.findOne({username})

        if (!isuserpresent){
            return res.status(401).json({msg:"This type of credential not present please signup first.."})
        }

        const ispasswordCorrect = await bcrypt.compare(password,isuserpresent.password)

        const token = jwt.sign({userID:isuserpresent._id},process.env.secret_key,{
            expiresIn:"4min"
        })
        if (ispasswordCorrect){
            return res.status(201).json({msg:"Login Sucessfully..",token})
        }

    }
    catch(error){
        console.log(error)
        res.status(401).json({msg:"wrong credential.. please login again.."})
    }
})






module.exports = {
    userRouter
}