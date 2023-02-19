const express=require('express'); 
const pool=require('../db');
const router=express.Router();

router.post('/',async(req,res)=>{
 
    const loginCredentials={email,password}=req.body;
    const user=await pool.query("SELECT email,password,isactive from usertable where email=$1",[email]);
    console.log(user); 
   


})




module.exports=router;