import mongoose from "mongoose";
import userSchema, { getAuthontication , comparePassword } from "../Models/userModel.js";
import  jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt'


export const userRegister = async (req,res) =>{
    const {name, email, password, image} = req.body
    if(!name ||!email ||!password ||!image) return res.status(400).send("All fields are required")

    const hashPassword = await userSchema.hashPassword(password)
    
    let val = await userSchema.create({
        name : name,
        email : email,
        password : hashPassword,
        imageUrl : image,
        
    })
    const  token = await getAuthontication(val)
 res.send("hogia")
}


export const userProfile = async (req,res)=>{
    const check1 = req.rawHeaders[1]
     const token = req.cookies.token || check1.split(' ')[1]
    if(!token){
        return res.status(403).send('Invalid Token')
        
    }
    
    jwt.verify(token, process.env.JWT_SECRET, (err)=>{
        console.log(err)
        if(err){
            res.status(403).send('Invalid Token1')
        }   
        else{
            const user = jwt.decode(token, process.env.JWT_SECRET)
            
            res.send({status : true, data: user})
        }
    })
}



export const userLogin = async (req,res)=>{
    const {email, password} = req.body
      if(!email ||!password) return res.status(400).send("All fields are required")
    
    const user = await userSchema.findOne({email}).select('+password')
    
    if(!user) return res.status(400).send("Invalid email or password")
    
    const validPassword = await bcrypt.compare(password, user.password)
    if(validPassword == true){
        const  token = await getAuthontication(user)
        res.cookie('token', token)
        res.send("true")
    }
    else{
        res.status(400).send("Invalid email or password")
    }
}

export const userLogout = (req,res) =>{
    try {
        res.clearCookie('token')
        res.send("Logged Out")
    }catch(err){
        res.send("some thing went wrong")
    }
}