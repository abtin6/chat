const jwt=require('jsonwebtoken');
const User=require('../models/user');
exports.createUser=async(req,res)=>{
    // console.log(req.body)
    // res.json(req.body)
    const {fullname,email,password}=req.body
   const isNewUser=await User.isThisEmailInUser(email)
   if(!isNewUser) return res.json({success:false,message:'this email is alrealy in use,try sing-in'})
   const user=await User.create({fullname,email,password})
   await user.save()
   res.json({user,message:'regster is ok ,pls login'})
}


exports.userSignIn=async(req,res)=>{
    // res.send('sign in')

    const {email,password}=req.body
    const user=await User.findOne({email})
    if(!user) return res.json({success:false,message:'user not found,with the given email'})
    const isMatch=await user.password
    // if(!isMatch ) return res.json({success:false,message:'email/password does not match'})
    if(isMatch !== password) return res.json({success:false,message:'email/password does not match'})
    const token=jwt.sign({useId:user._id},process.env.JTW_SECRET,{expiresIn:'1d'})
    const myname=await user.fullname
    res.json({success:true,user,token,myname})
    
 }