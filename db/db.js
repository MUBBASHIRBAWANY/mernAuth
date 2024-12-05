const mongoose = require('mongoose')


const connectDb = async () =>{
    mongoose.connect(process.env.URL).then(()=>{
        console.log("DataBase Conected")
})
}

module.exports = connectDb