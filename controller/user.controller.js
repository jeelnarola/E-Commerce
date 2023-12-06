const usermodel = require("../Model/user.model")
const jwt=require('jsonwebtoken')
require('dotenv').config()

let {token}=process.env

console.log(token);

const Home=(req,res)=>{
   res.send('Home')
}

const SignupGet=(req,res)=>{
    res.render('signup')
}

const SignupPost=async(req,res)=>{
    let {email}=req.body
    let data=await usermodel.findOne({email:email})
     if(data){
        res.send("user")
     }else{
        let data=await usermodel.create(req.body)
        const token = jwt.sign({id:data.id,role:data.role},process.env.token)
        res.cookie('token',token).send(data)
     }
}

const signupCheck=async(req,res)=>{
   let {email}=req.query
    let data=await usermodel.findOne({email:email})
     if(data){
        res.send({data:data})
     }else{
        res.send({msg : "User not reistered"})
     }
}

const loginCheck=async(req,res)=>{
   let {email}=req.query
    let data=await usermodel.findOne({email:email})
     if(data){
        res.send("login !")
     }else{
        res.send({msg : "User not reistered"})
     }
}


const loginGet=(req,res)=>{
   res.render('login')
}

module.exports={SignupGet,SignupPost,signupCheck,loginGet,Home,loginCheck}