const mongoose = require('mongoose')

let url = process.env.URL

const connectDb = async () =>{
    mongoose.connect(url).then(()=>{
        console.log("DataBase Conected")
})
}

module.exports = connectDb