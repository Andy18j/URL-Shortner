const express = require("express")
const { userModel } = require("../model/user.model")
require("dotenv").config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const userRouter = express.Router()

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