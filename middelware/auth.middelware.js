const userModel = require('../Models/User.model.js')
const jwt = require('jsonwebtoken')

const BlacklistTokenModale = require('../Models/BlacklistToken.modale.js');
const JWT_SECRET = process.env.JWT_SECRET




module.exports.authuser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized.' })
    }
    const isBlacklisted = await BlacklistTokenModale.findOne({token: token})
    if(isBlacklisted){
        return res.status(401).json({ message: 'Unauthorized.' })
    }
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await userModel.findById(decoded._id)

        req.user = user;

        return next();

    }catch(err){
        return res.status(401).json({ message: 'Unauthorized.' })

    }

}