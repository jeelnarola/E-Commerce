let jwt=require('jsonwebtoken')
require('dotenv').config()


const verifyToken=(req,res,next)=>{
    let {token}=req.cookies
    if(token){
        let decode=jwt.verify(token,process.env.token)
        if(decode){
            req.user=decode
            next()
        }
        else{
            res.send({msg:"login...."})
        }
    }else{
        res.send({msg:"login or signup...."})
    }
}

module.exports=verifyToken