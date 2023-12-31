const cartModel = require("../Model/cart.schema");
const productModel = require("../Model/product.model");
const savemodel = require("../Model/save.schema");
const usermodel = require("../Model/user.model");
const path = require("../helper");


const UserProfile=async(req,res)=>{
    let pat=path()
    pat+=`/${req.file.path}`
    let data=await usermodel.findById(req.user.id)
    data.img=pat;
    await data.save()
    res.send("yes")
}

const Product=(req,res)=>{
    res.render("product",{edit:false})
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

const userPostPaeg=(req,res)=>{
    res.render("userPost")
}

const userPost=async(req,res)=>{
    let {id}=req.params
    let data=await productModel.findById(id)
    res.send(data)
}

const Edit=async(req,res)=>{
    let {id}=req.params
    let data=await productModel.findById(id)
    res.render('product',{data,edit:true})
}

const cartGet=async(req,res)=>{
    res.render("cart")
}

const cartData=async(req,res)=>{
    let data=await cartModel.find({userId:req.user.id}).populate("productId")
    res.send(data)
}

const cartAdd=async(req,res)=>{
    let {productId} = req.body;
    let userId = req.user.id;
    req.body.userId = userId;

    let data=await cartModel.create({productId,userId})
    console.log(productId);
}

const productSave=async(req,res)=>{
    let{productId}=req.body
    let userId=req.user.id
    let data=(await savemodel.create({productId,userId}))
    res.render("profile")
}

const SaveData=async(req,res)=>{
    let data=await savemodel.find({userId:req.user.id}).populate("productId")
    res.send(data)
}


const qyt=async(req,res)=>{
    let {qyt}=req.body
    let {id}=req.params
    let data=await cartModel.findById(id)

    data.qyt +=qyt
    await data.save()
    if(data.qyt==0){
        await cartModel.findByIdAndDelete(id)
    }
    res.send("updata")
}






module.exports={Product,ProductPost,Profile,UserData,ProductShow,productGet,adminProduct,singlePaeg,SingleData,userPost,userPostPaeg,Edit,cartAdd,cartGet,cartData,UserProfile,productSave,SaveData,qyt}