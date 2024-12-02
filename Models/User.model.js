const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const SECRETKEY = process.env.JWT_SECRET



const userSchema = new mongoose.Schema({
    fullname : {
        firstname : {
            type : String,
            required : true,
            minlength : [3,'First Name Must Have Three Charecter']
        },
        lastname : {
            type : String,
            required : true,
            minlength : [3,'Last Name Must Have Three Charecter']
        }
    },
    email :{
        type : String,
        required : true,
        minlength : [3,'Email Must Have Three Charecter']
    },
    password : {
        type : String,
        required : true,
        select : false
    },
    socketId : {
        type : String,
    }
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, SECRETKEY, {expiresIn : '1h'});
    return token;
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10)
}


const userModel = mongoose.model('user', userSchema)

module.exports = userModel