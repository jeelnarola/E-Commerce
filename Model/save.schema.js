const mongoose=require("mongoose")

const save=new mongoose.Schema({
    productId:{type:mongoose.Schema.Types.ObjectId,ref:"product"},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"user"},
    icon:String,
})

const savemodel=mongoose.model("save",save)

module.exports=savemodel