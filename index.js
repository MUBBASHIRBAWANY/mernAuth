import express from 'express';
import { Router } from 'express';
import { defUlt } from './app.js';
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();
app.use(cors())
app.use(cookieParser());
app.use(express.json())


app.use('/', defUlt)

app.listen(4000)