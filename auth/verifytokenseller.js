const jwt=require('jsonwebtoken');
require('dotenv').config();
const pool=require('../db');
module.exports=async(req,res,next)=>{
    try {
        const jwtToken=req.header("token");
        if(!jwtToken){
            return res.status(403).json({message:"not authorized no token"});
        }
        const payload=jwt.verify(jwtToken,process.env.JWTSECRET);
    
       const isactivequery=await pool.query("SELECT isactive from sellertable where email=$1",[payload.email]);
       const rolequery=await pool.query("SELECT role from sellertable where email=$1",[payload.email]);
       const isactive=await isactivequery.rows[0].isactive;
       const role=await rolequery.rows[0].role;

       if(isactive=='false'&&role!=='seller'){
        return res.status(403).json({message:"not authorized not active or role not seller"});
       }

       next();

    } catch (error) {
        return res.status(500).json({'message':error.message});
    }


   
}