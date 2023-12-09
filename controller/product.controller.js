const productModel = require("../Model/product.model")

const Product=(req,res)=>{
    res.render("product")
}

const ProductPost=async(req,res)=>{

    req.body.createdby=req.user.id
    let data=await productModel.create(req.body)
    res.send(data)
}

const Profile=async(req,res)=>{
    let {id}=req.user
    console.log("id",id);
    
    let data=await productModel.find({createdby:id})
    console.log(data);
    res.render('profile')
}

module.exports={Product,ProductPost,Profile}