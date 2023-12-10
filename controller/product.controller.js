const productModel = require("../Model/product.model")
const usermodel = require("../Model/user.model")

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
    let data=await productModel.find({createdby:id})
    res.render('profile')
}

const UserData=async(req,res)=>{
    let {id}=req.user
    let user=await usermodel.findOne({_id:id})
    res.send(user)
}

module.exports={Product,ProductPost,Profile,UserData}