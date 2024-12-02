const mongoose = require('mongoose')
const URL = process.env.URL

const connectDb = async () =>{
    mongoose.connect(URL).then(()=>{
        console.log("DataBase Conected")
})
}

module.exports = connectDb
