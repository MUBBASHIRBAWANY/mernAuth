import express from 'express'
import userRoute from './Routers/userRoute.js'
import   db   from './db/db.js'
import dotenv from 'dotenv'
dotenv.config()

const router = express.Router()

let dataBase = db
dataBase()


const app = express()

export const defUlt = app.use('/user', userRoute )