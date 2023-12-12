const mongoose=require('mongoose')

const product=new mongoose.Schema({
    title:String,
    price:Number,
    desc:String,
    category:String,
    img:String,
    stock:Number,
    rating:[{userid:String, value:Number}],
    size:[{type:String,default:"all"}],
    color:String,
    createdby:{type:mongoose.Schema.Types.ObjectId, ref:"user"}
})

const productModel=mongoose.model('product',product)

module.exports=productModel