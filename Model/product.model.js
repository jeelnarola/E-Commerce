const mongoose=require('mongoose')

const product=new mongoose.Schema({
    title:string,
    price:Number,
    desc:string,
    category:string,
    img:string,
    stock:Number,
    rating:[{userid:string, value:Number}],
    size:string,
    color:string,
    createdby:{type:mongoose.Schema.Types.ObjectId, ref:"user"}
})

const productModel=mongoose.model('product',product)

module.exprots=productModel