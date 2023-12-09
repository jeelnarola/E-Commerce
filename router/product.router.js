const {Router}=require("express")
const { Product, ProductPost, Profile } = require("../controller/product.controller")
const verifyToken = require("../middleware/verifyToken")

const product=Router()

product.get("/product",Product)
product.post("/product",verifyToken,ProductPost)


product.get("/profile",verifyToken,Profile)

module.exports=product