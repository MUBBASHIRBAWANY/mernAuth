import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()


const db = () => {
 mongoose.connect("mongodb+srv://Mubbashir123:Mubbashir1234@airbnb1.873o2.mongodb.net/uber-clone").then(()=>{
    console.log("DataBase Conected")
})
}

export default db
