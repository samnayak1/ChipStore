const pool=require('../db');
const verifyToken=require('../auth/verifyToken');
const express=require('express')
const router=express.Router();

router.get('/footwear',async(req,res)=>{
   res.status(200);
}
)

module.exports=router;