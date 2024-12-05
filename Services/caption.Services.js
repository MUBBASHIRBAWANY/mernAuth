const captionModele = require('../Models/Caption.model')


module.exports.createCaption = async ({
    firstName, lastName, email, password
}) =>{
    if (!firstName ||!lastName ||!email ||!password) {
    return console.log("error")
    }
    const caption = captionModele.create({
        fullName : {
            firstName,
            lastName,
        },
        email,
        password,
    })
    console.log(caption)
    return caption

 
}