import express from 'express'
import { userRegister,userProfile,userLogin , userLogout} from '../Controllar/userControllar.js'
const userRoute = express.Router()

const app = express()

userRoute.post('/', userRegister)
userRoute.post('/profile', userProfile)
userRoute.post('/login', userLogin)
userRoute.post('/logout', userLogout)


export default userRoute