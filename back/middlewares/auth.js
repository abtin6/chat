const jwt=require('jsonwebtoken');
const User=require('../models/user');
exports.isAuth=async(req,res,next)=>{
    // console.log(req.headers.authorization)
    if (req.headers && req.headers.authorization) {
       const token= req.headers.authorization.split(' ')[1]
       try {
         const decoded= jwt.verify(token,process.env.JTW_SECRET)

      const user=await User.findById(decoded.useId)
      
      if(!user){
        return res.json({success:false,message:'unauthorized access1!'})
      }
      req.user=user
      next()
       } catch (error) {
            if(error.name === 'JsonWebTokenError'){
                 return res.json({success:false,message:'unauthorized access1!'})
            }
            if(error.name === 'TokenExpiredError'){
                return res.json({success:false,message:'cesson expired try sign in!'})
           }
           res.json({success:false,message:'internal server error!'})
       }
      
    } else {
        res.json({success:false,message:'unauthorized access!'})
    }
}