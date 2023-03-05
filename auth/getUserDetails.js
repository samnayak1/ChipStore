const express=require("express");
const app=express();
const router=express.Router();
const jwt=require("jsonwebtoken");
const rateLimit = require('express-rate-limit');
const pool = require('../db');
const verifyToken = require("./verifyToken");

router.get('/',verifyToken,async(req,res)=>{
    const jwtToken=req.header("token");
   const user=jwt.verify(jwtToken,process.env.JWTSECRET);
  const email=user.email;
  const idquery=await pool.query("SELECT user_id,first_name,last_name,state,country,isactive from usertable where email=$1",[email]);
const id=idquery.rows[0].user_id;
const firstname=idquery.rows[0].first_name;
const lastname=idquery.rows[0].last_name;
const state=idquery.rows[0].state;
const country=idquery.rows[0].country;
const isactive=idquery.rows[0].isactive;
res.status(200).json({
  'id':id,
  'first_name':firstname,
   'last_name':lastname,
  'state':state,
'country':country,
'isactive':isactive  });
})



module.exports=router;