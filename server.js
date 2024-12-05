const app = require("./app")
const port = process.env.PORT 

const connectDb = require('./db/db.js')

 connectDb()

app.listen(port, ()=>{
    console.log(`server runing at ${port}`)
})