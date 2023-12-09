const {Router}=require('express')
const { SignupGet, SignupPost, signupCheck, loginGet, Home, loginCheck, forget, forgetPost, resetEmail, Resend, otpVerify, Reset } = require('../controller/user.controller')
const verifyToken = require('../middleware/verifyToken')

const router=Router()
router.get('/',Home)

router.get('/signup',SignupGet)
router.post('/signup',SignupPost)
router.get('/signupCheck',signupCheck)


router.get('/login',loginGet)
router.get("/loginCheck",loginCheck)

router.get('/EmailVerify',forget)
router.post('/EmailVerify',forgetPost)

// router.get('/resend',forgetPost)
router.get('/resend',Resend)

router.post('/otpVerify',otpVerify)

router.get('/reset',Reset)


module.exports=router