const captionModale = require("../Models/Caption.Model")
const jwt = require("jsonwebtoken")
const BlacklistToken = require('../Models/BlacklistToken.modale.js')
const JWT_SECRET = process.env.JWT_SECRET



module.exports.getCaption = async (req, res, next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

    if (!token) {
        return res.status(401).json({massege : "Unauthorized."})
    }
    const isBlacklisted = await BlacklistToken.findOne({token: token})

    if(isBlacklisted){
        return res.status(401).json({massege : "Unauthorized."})
    }
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        const captoin = await captionModale.findById(decoded._id )

        req.caption = captoin

        return next();
    }catch(err){
        return res.status(401).json({ message: 'Unauthorized.' })

    }
}

