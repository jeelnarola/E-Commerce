const {Router}=require("express")
const { Product, ProductPost, Profile, UserData, user ,UserProfile, ProductShow, productGet, adminProduct, singlePaeg, SingleData, userPost, userPostPaeg, Edit } = require("../controller/product.controller")
const verifyToken = require("../middleware/verifyToken")
const usermodel = require("../Model/user.model")

const multer=require("multer")
const product=Router()

let Store=multer.diskStorage({
    destination:"images",
    filename:(req,file,cd)=>{
        cd(null,file.originalname);
    },
})
const use=multer({
    storage:Store,
})

product.get("/product",Product)
product.post("/product",verifyToken,ProductPost)

product.get("/ProductShow",ProductShow)
product.get("/productGet",productGet)


product.get("/profile",verifyToken,Profile)
product.get("/AdminProduct",verifyToken,adminProduct)
product.get("/userdata",verifyToken,UserData)

product.get("/singlePaeg/:id",singlePaeg)
product.get("/SingleData/:id",SingleData)

product.get("/userPost/:id",userPostPaeg)
product.get("/PostData/:id",userPost)

product.get("/edit/:id",Edit)

product.post("/userprofile",use.single("img"),async(req,res)=>{
    console.log(req.file);
    res.send("je")
})

module.exports=product