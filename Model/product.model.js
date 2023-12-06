const mongoose=require('mongoose')

const product=new mongoose.Schema({
    title:string,
    createdby:{type:mongoose.Schema.Types.ObjectId, ref:"user"}
})

const productModel=mongoose.model('product',product)

module.exprots=productModel