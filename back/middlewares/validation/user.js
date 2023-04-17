const {check,validationResult}=require('express-validator');

exports.validateUserSignUp=[
    check('fullname')
    .trim().not().isEmpty().withMessage('name is required!')
    // .not()
    .isString().withMessage('must be a valid name')
    .isLength({min:3,max:20}).withMessage('3ta20 karakter'),

    check('email')
    .normalizeEmail().isEmail().withMessage('invalid email'),

    check('password')
    .trim().not().isEmpty().withMessage('passwrd is empty')
    .isLength({min:8,max:20}).withMessage('3ta20 karakter'),

    check('confirmPassword')
    .trim().not().isEmpty().withMessage('confirmPassword is empty')
    .custom((value,{req})=>{
        if(value !== req.body.password){throw new Error('both password must be same!')}
        return true
    })

]

exports.userValidation=(req,res,next)=>{
   const result= validationResult(req).array()
//    console.log(result)
if(!result.length) return next()
const error=result[0].msg
res.json({success:false,message:error})
}


exports.validateUserSignIn=[
    check('email')
    .trim().isEmail().withMessage('email/password is required!'),

    check('password')
    .trim().not().isEmpty().withMessage('email/password is required!')
    
]
