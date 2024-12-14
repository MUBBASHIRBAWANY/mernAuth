import express from 'express';
import { Router } from 'express';
import { defUlt } from './app.js';
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();
const port = 4000
app.use(cors())
app.use(cookieParser());
app.use(express.json())


app.use('/', defUlt)
app.get('/', (req,res)=>{
    res.send(`Server Runing at ${port}`)
})


app.listen(port,console.log(port))