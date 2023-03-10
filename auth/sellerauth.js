const express=require('express');
const router=express.Router();
const verifytokenseller=('./verifytokenseller');
const pool=require('../db');
const bcrypt=require('bcrypt');
const jwtGenerator=require('./jwtgenerator');
router.post('/login',async (req,res)=>{

    try {
        
   
    const loginCredentials={email,password}=req.body;
    const user=await pool.query("SELECT seller_id,email,password,isactive from sellertable where email=$1",[email]); 
    if(user.rows.length==0){
        res.status(401).json({message:'user not found'});
    }
    const sellerid=user.rows[0].seller_id;
    const UserEmail=user.rows[0].email;
    const UserPassword=user.rows[0].password;
    const isactive=user.rows[0].isactive;
    if(isactive=='false'){
        res.status(401).json({message:'user is deactivated'})
    }
    if(!bcrypt.compare(password,UserPassword)){
        res.status(401).json({message:'wrong password'});

    }

    const token=jwtGenerator(sellerid,UserEmail);
    res.json({'token':token});

} catch (error) {
     res.status(500).json({'message':error.message});   
}
})



module.exports=router;




