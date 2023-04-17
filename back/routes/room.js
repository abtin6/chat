const express=require('express');



const {createUser, userSignIn}=require('../controllers/room');


const router=express.Router()



router.get('/room-1',createRoom)


module.exports=router