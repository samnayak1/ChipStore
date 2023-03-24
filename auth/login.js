const express=require('express'); 
const pool=require('../db');
const router=express.Router();
const bcrypt=require('bcrypt');
const jwtGenerator=require('./jwtgenerator');
router.post('/',async (req,res)=>{
try {
    

    const loginCredentials={email,password}=req.body;
    const user=await pool.query("SELECT user_id,email,password,isactive from usertable where email=$1",[email]); 
    if(user.rows.length==0){
        res.status(404).json({message:'user not found'});
    }
    const userid=user.rows[0].user_id;
    const UserEmail=user.rows[0].email;
    const UserPassword=user.rows[0].password;
    const isactive=user.rows[0].isactive;
 
  
    
    if(isactive=='false'){
        res.status(401).json({message:'user is deactivated'})
        return;
    }
    else
    if(!await bcrypt.compare(password,UserPassword)){
        res.status(401).json({message:'wrong password'});
        return;

    }
    else{
    const token=jwtGenerator(userid,UserEmail);
    res.status(200).json({'token':token});
    }


} catch (error) {
    res.status(500).json({'message':error.message});
}





   


})




module.exports=router;