const express = require('express')
const { connection } = require("mongoose")
const {config} = require("./config/db")
const { userRouter } = require('./routes/user.routes')
const { urlRouter } = require('./routes/url.routes')
require("dotenv").config()
const cors = require("cors")



const app = express()
app.use(express.json())
app.use(cors())

app.use("/api/users", userRouter)
app.use("/api/urls", urlRouter)

app.get('/',(req,res)=>{
    res.send("welcome to Shortner URL🙏")
})


app.listen(process.env.PORT,async()=>{
    try{
         await connection
         console.log("Server connected to the DB")
    }
    catch(error){
        console.log("Server not connected To the DB")
    }
    console.log(`port is running on the ${process.env.PORT}`)
})