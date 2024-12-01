const http = require ("http")
const app = require("./app")
const port = process.env.PORT 
const server = http.createServer(app)
const connectDb = require('./db/db.js')

 connectDb()

server.listen(port, ()=>{
    console.log(`server runing at ${port}`)
})