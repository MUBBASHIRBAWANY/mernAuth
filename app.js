const dotenv = require('dotenv')
dotenv.config()
const express = require ('express')
const app = express()
const cors = require("cors")
const userRoute = require("./Routes/userRoutes.js")
const cookieparser = require("cookie-parser")

app.use(express.json());
app.use(cors())
app.use(cookieparser())
app.use(express.urlencoded({extended : true}))

app.get("/",(req,res)=>{
    res.send("Hello world")
})

app.use('/user', userRoute)

module.exports = app