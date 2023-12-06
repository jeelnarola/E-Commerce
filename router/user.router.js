const {Router}=require('express')
const { SignupGet, SignupPost, signupCheck, loginGet, Home, loginCheck } = require('../controller/user.controller')
const verifyToken = require('../middleware/verifyToken')

const router=Router()
router.get('/',verifyToken,Home)

router.get('/signup',SignupGet)
router.post('/signup',SignupPost)
router.get('/signupCheck',signupCheck)


router.get('/login',loginGet)
router.get("/loginCheck",loginCheck)


module.exports=router