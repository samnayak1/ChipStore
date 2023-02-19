const express=require('express'); 
const pool=require('../db');
const router=express.Router();

router.post('/',async(req,res)=>{
 
    const loginCredentials={email,password}=req.body;
    const user=await pool.query("SELECT * from usertable where ")
   


})




module.exports=router;