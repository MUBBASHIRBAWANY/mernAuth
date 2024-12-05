const captionModele = require('../Models/Caption.model.js')
const captionServices = require('../Services/caption.Services')
const {validationResult} = require ('express-validator')
const blacklistToken = require('../Models/BlacklistToken.modale.js')

module.exports.createCaption = async (req, res, next) => {
    const errors = validationResult(req.body)

    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {fullName, email, password} = req.body
    const hashPassword = await captionModele.hashPassword(password)

    const caption = await captionServices.createCaption({
        firstName : fullName.firstName,
        lastName : fullName.lastName,
        email,
        password : hashPassword,
        
    })


    const token = await caption.getAuthToken()

    res.status(200).send({token, caption})
}