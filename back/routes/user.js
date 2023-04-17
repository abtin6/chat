const express=require('express');
const multer=require('multer');
const { validationResult } = require('express-validator');
const sharp=require('sharp');

const {createUser, userSignIn}=require('../controllers/user');
const { isAuth } = require('../middlewares/auth');
const { validateUserSignUp, userValidation, validateUserSignIn } = require('../middlewares/validation/user');
const User=require('../models/user');

const router=express.Router()
const storage=multer.memoryStorage()
const fileFilter=(req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }else{
        cb('invalid image file!',false)
    }
}
const uploads=multer({storage,fileFilter})


router.post('/create-user',validateUserSignUp,userValidation,createUser)
router.post('/sign-in'    ,validateUserSignIn,userValidation,userSignIn)
// router.post('/create-post',isAuth,(req,res)=>{res.send('wlc u are in secret route')})
router.post('/upload-profile',isAuth,uploads.single('profile'),async(req,res)=>{
   const {user} =req
   if(!user) return res.status(401).json({success:false,message:'unauthorized access1!'})
   
try {
    const profileBuffer=req.file.buffer
   const {width,height}=await sharp(profileBuffer).metadata()
   const avatar=await sharp(profileBuffer).resize(Math.round(width*0.5),Math.round(height*0.5)).toBuffer()
   await User.findByIdAndUpdate(user._id,{avatar})
   res.status(201).json({success:true,message:'up pro ok'})
} catch (error) {
    res.status(500).json({success:false,message:'server error!'})
    console.log('error pro img',error.message)
}
})

module.exports=router