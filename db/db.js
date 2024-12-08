const mongoose = require('mongoose')


const connectDb = mongoose.connect('check').then(()=>{
    console.log("DataBase Conected")
})

module.exports = connectDb
