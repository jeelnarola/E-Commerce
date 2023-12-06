const mongoose=require('mongoose')
require('dotenv').config()

const database=async()=>{
    await mongoose.connect(process.env.database)
    console.log("Database connect ");
}

module.exports=database