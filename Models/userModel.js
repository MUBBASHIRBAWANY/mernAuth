 import mongoose from "mongoose";
 import  jwt  from "jsonwebtoken";
 import bcrypt from 'bcrypt'

 const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        select : false
    },
    imageUrl :{
        type : String,
    }
 })

 userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10)
}

export const comparePassword = (password) =>{
    return bcrypt.compare(password, this.password)
}

export const getAuthontication = async function(val){
    
    const token = jwt.sign({val}, process.env.JWT_SECRET, {expiresIn : "1300s"})
    
    return token
} 



 const userModel = mongoose.model('user', userSchema)

 export default userModel