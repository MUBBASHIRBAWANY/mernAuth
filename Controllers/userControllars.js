const userModel = require('../Models/User.model.js')
const userServices = require("../Services/user.Services.js")
const { validationResult } = require('express-validator')
const blacklistToken = require('../Models/BlacklistToken.modale.js')

module.exports.registerUser = async (req,res,next) =>{
    const error = validationResult(req);
    
    if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
    }
    console.log(req.body)
    const {fullname, email, password } = req.body;
    const hashPassword = await userModel.hashPassword(password);

    const user = await userServices.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword
        
    })

    const token = user.generateAuthToken()

    res.status(200).send({token, user})
}


module.exports.login = async (req,res,next) =>{
   
        const {email, password} = req.body;
    const user = await userModel.findOne({email}).select('+password')
        if(!user){
            return res.status(401).send({message: "invalid email password"})
        }
    const isMatch = await user.comparePassword(password)
    if(!isMatch){
        return res.status(401).send({message: "invalid email password"})
    }

    const token = user.generateAuthToken();

    res.cookie('token', token)

    res.status(201).send({token, user})
}

module.exports.getUserProfile = async (req,res, next)=>{
    res.status(200).json(req.user)
}

module.exports.logoutUser = async (req,res,next) =>{
    res.clearCookie('token')
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    console.log(token)
    await blacklistToken.create({token})
    res.status(200).send({message: "User logged out"})
}