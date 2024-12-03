const mongoose = require('mongoose')
const URL = process.env.URL

const connectDb = async () =>{
    mongoose.connect(`${URL}/uber-clone`).then(()=>{
        console.log("DataBase Conected")
})
}

module.exports = connectDb
