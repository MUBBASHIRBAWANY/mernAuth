const userModel = require("../Models/User.model.js")

// Create a new user in the database

module.exports.createUser = async ({
    firstname, lastname, email, password
})=>{
    if (!firstname || !email || !password) {
        console.log("error")
    }

    const user = userModel.create({
                fullname : {
                    firstname,
                    lastname,
                },
                email,
                password,
            })
    console.log(user)
    return user
} 