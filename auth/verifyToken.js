const jwt=require('jsonwebtoken');
require('dotenv').config();
const pool=require('../db');
module.exports=async(req,res,next)=>{
    try {
        const jwtToken=req.header("token");
        if(!jwtToken){
            return res.status(403).json({message:"not authorized"});
        }
        const payload=jwt.verify(jwtToken,process.env.JWTSECRET);
    
       const isactivequery=await pool.query("SELECT isactive from usertable where email=$1",[payload.email]);
       const isactive=await isactivequery.rows[0].isactive;
       if(isactive=='false'){
        return res.status(403).json({message:"not authorized"});
       }

       next();

    } catch (error) {
        return res.status(403).json({message:"not authorized"});
    }


   
}