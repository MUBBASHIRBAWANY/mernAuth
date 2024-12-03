const mongoose = require('mongoose')
const URL = process.env.URL

const connectDb = async () =>{
    mongoose.connect(`mongodb+srv://Mubbashir123:Mubbashir1234@airbnb1.873o2.mongodb.net/uber-clone`).then(()=>{
        console.log("DataBase Conected")
})
}

module.exports = connectDb
