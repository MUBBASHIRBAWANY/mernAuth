const express = require("express")
const router = express.Router()
const { body } = require("express-validator")
const userControllar = require("../Controllers/userControllars.js")
const authMidelware = require('../middelware/auth.middelware.js')



router.post('/register', [
    body("email").isEmail().withMessage("Invalid Email"),
    body('fullname').isLength({min : 3}).withMessage('first Name Must be atleast 3 character long'),
    body('password').isLength({min : 6}).withMessage("Passwor Must be atleast 3 character long")
],
userControllar.registerUser
)

router.post('/login',[  
    body("email").isEmail().withMessage("Invalid Email"),
    body('password').isLength({min : 6}).withMessage("Passwor Must be atleast 3 character long")
],
userControllar.login
)


router.get('/profile',authMidelware.authuser, userControllar.getUserProfile)
router.get('/logout',authMidelware.authuser,userControllar.logoutUser)
module.exports = router

