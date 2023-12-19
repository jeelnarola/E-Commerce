const {Router}=require("express")
const { Product, ProductPost, Profile, UserData,UserProfile, ProductShow, productGet, adminProduct, singlePaeg, SingleData, userPost, userPostPaeg, Edit, cartAdd, cartGet, cartData, productSave, SaveData, qyt } = require("../controller/product.controller")
const verifyToken = require("../middleware/verifyToken")
const usermodel = require("../Model/user.model")

const multer=require("multer")
const product=Router()

const Store=multer.diskStorage({
    destination:"images",
    filename:(req,file,cd)=>{
        cd(null,file.originalname);
    },
})
const uplod=multer({
    storage:Store,
}).single("img")

// let Store=multer.diskStorage({
//     destination:"images",
//     filename:(req,file,cd)=>{
//         cd(null,file.originalname);
//     },
// })
// const use=multer({
//     storage:Store,
// })

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


product.post("/UserProfile",verifyToken,uplod,UserProfile)


// CART Router


product.get("/cart",verifyToken,cartGet)
product.post("/cart",verifyToken,cartAdd)
product.get("/cartProduct",verifyToken,cartData)

product.patch("/cartQyt/:id",qyt)

product.get("/save",verifyToken,SaveData)
product.post("/save",verifyToken,productSave)

product.get("/logout",(req,res)=>{
    res.clearCookie("token").clearCookie("user").clearCookie("U").render("home")
})



module.exports=product