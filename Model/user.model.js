const mongoose=require('mongoose')

const  userSchema=new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    role:{type: String,
        enum: ["user", "admin"], // Define allowed roles
        default: "user",}
})

const usermodel=mongoose.model("user",userSchema)

module.exports=usermodel