const mongoose = require('mongoose')
const url = process.env.URL

const connectDb = async () =>{
    mongoose.connect(url).then(()=>{
        console.log("DataBase Conected")
})
}

module.exports = connectDb