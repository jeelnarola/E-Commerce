const {Router}=require("express")
const { Product, ProductPost, Profile, UserData } = require("../controller/product.controller")
const verifyToken = require("../middleware/verifyToken")
const usermodel = require("../Model/user.model")

const product=Router()

product.get("/product",Product)
product.post("/product",verifyToken,ProductPost)


product.get("/profile",verifyToken,Profile)
product.get("/userdata",verifyToken,UserData)

module.exports=product