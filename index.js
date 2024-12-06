const app = require("./app.js")
const port = process.env.PORT 
var cors = require('cors');
app.use(cors())
const connectDb = require('./db/db.js')

 connectDb()

app.listen(port, ()=>{
    console.log(`server runing at ${5000}`)
})