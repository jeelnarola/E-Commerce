const usermodel = require("../Model/user.model")
const jwt=require('jsonwebtoken')
const nodemailer=require('nodemailer')
const Mail = require("nodemailer/lib/mailer")
const otpgenerator=require('otp-generator')
require('dotenv').config()

let {token}=process.env

const Home=(req,res)=>{
   res.render('Home')
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
        console.log(data);
        const token = jwt.sign({id:data.id,role:data.role},process.env.token)
        res.cookie('token',token).cookie("U",data.role).send(data)
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
      const token = jwt.sign({id:data.id,role:data.role},process.env.token)
        res.cookie('token',token).cookie("U",data.role).cookie("user",data.email).send({data:data})
     }else{
        res.send({msg : "User not reistered"})
     }
}


const loginGet=(req,res)=>{
   res.render('login')
}

const forget=(req,res)=>{
   res.render("EmailVerify")
   
}

let otp;

const forgetPost=(req,res)=>{
   let {email}=req.body
   let {user}=req.cookies

   otp=otpgenerator.generate(6,{
      specialChars:false,
      lowerCaseAlphabets:false,
      upperCaseAlphabets:false,
   })

   const mailoptions={
      from:process.env.user,
      to:email,
      subject:"reset password",
      html:`otp --> ${otp}`
   }

   transport.sendMail(mailoptions,(err,info)=>{
      if(err){
         console.log(err);
      }
      else{
         console.log(info);
      }
   })
   res.cookie('resetEmail',email).render('otp')
}

//  nodemailer

const transport=nodemailer.createTransport({
   service:"gmail",
   auth:{
      user:process.env.user,
      pass:process.env.pass,
   },
})

const Resend=(req,res)=>{
   let {resetEmail}=req.cookies
   
   
   otp=otpgenerator.generate(6,{
      specialChars:false,
      lowerCaseAlphabets:false,
      upperCaseAlphabets:false,
   })

   const mailoptions={
      from:process.env.user,
      to:resetEmail,
      subject:"reset password",
      html:`otp --> ${otp}`
   }

   transport.sendMail(mailoptions,(err,info)=>{
      if(err){
         console.log(err);
      }
      else{
         console.log(info);
      }
   })
   res.render("otp")

}

const otpVerify=(req,res)=>{
   let otpa=req.body.otp
   let myotp=''
   for(let i=0;i<otpa.length;i++){
      myotp+=otpa[i]
   }

   if(otp==myotp){
      console.log();
      res.send('yes')
   }else{
      res.send("no")
   }
}

const Reset=(req,res)=>{
   res.render('forget')
}

module.exports={SignupGet,SignupPost,signupCheck,loginGet,Home,loginCheck,forget,forgetPost,Resend,otpVerify,Reset}