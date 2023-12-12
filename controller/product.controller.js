const productModel = require("../Model/product.model")
const usermodel = require("../Model/user.model")
const multer=require("multer")

const Store=multer.diskStorage({
    destination:"images",
    filename:(req,file,cd)=>{
        cd(null,file.originalname);
    },
})
const user=multer({
    storage:Store,
}).single("img")

const UserProfile=async(req,res)=>{
    console.log(req.file.path);
    res.send(req.file.path)
}

const Product=(req,res)=>{
    res.render("product")
}

const ProductPost=async(req,res)=>{

    req.body.createdby=req.user.id
    let data=await productModel.create(req.body)
    res.send(data)
}

const Profile=async(req,res)=>{

    res.render('profile')
}

const adminProduct=async(req,res)=>{
    let {id}=req.user
    let data=await productModel.find({createdby:id})
    res.send(data)
}

const UserData=async(req,res)=>{
    let {id}=req.user
    let user=await usermodel.findOne({_id:id})
    res.send(user)
}

const ProductShow=async(req,res)=>{
    res.render("productShow")
}
const productGet=async(req,res)=>{
    let data=await productModel.find()
    res.send(data)
}

const singlePaeg=(req,res)=>{
    res.render("singlePaeg")
}

const SingleData=async(req,res)=>{
    let {id}=req.params;
    let data=await productModel.findById(id)
    res.send(data)
}

module.exports={Product,ProductPost,Profile,UserData,user,UserProfile,ProductShow,productGet,adminProduct,singlePaeg,SingleData}