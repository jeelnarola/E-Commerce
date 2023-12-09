const express=require('express');
const database = require('./config/db');
const cookies=require('cookie-parser')
const router = require('./router/user.router');
const product = require('./router/product.router');
require('dotenv').config()

const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set("view engine","ejs")
app.set("views",__dirname+"/view")
app.use(express.static(__dirname+"/public"))

app.use(cookies())
app.use(router)
app.use(product)


app.listen(process.env.port,()=>{
    console.log("server start");
    database()
})