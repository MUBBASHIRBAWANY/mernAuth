const mongoose = require(`mongoose`)
const JWT_SECRET = process.env.JWT_SECRET
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')



 const captionSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, 'First Name Must Have Three Charecter']
        },
        lastName: {
            type: String,
            required: true,
            minlength: [3, 'Last Name Must Have Three Charecter']
        },

    },
    email: {
        type: String,
        required: true,
        minlength: [3, 'Email Must Have Three Charecter']
    },
    password: {
        type: String,
        required: true,
        select: false
    },

    stokeid: {
        type: String,
    }


})


captionSchema.methods.getAuthToken = function (){
    const token = jwt.sign({_id: this._id}, JWT_SECRET, {expiresIn : "1h"})
    return token
}

captionSchema.methods.comparePassword = async function(password){
   return await bcrypt.compare(password, this.password)
}

captionSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10)
}

const Caption = mongoose.model('Caption', captionSchema)


module.exports = Caption