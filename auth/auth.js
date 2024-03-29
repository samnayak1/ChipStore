const express=require('express');
const pool = require('../db');
const app=express();
const router=express.Router();
const bcrypt=require('bcrypt');
const nodemailer=require('nodemailer')
const jwt=require('jsonwebtoken')
const jwtGenerator=require('./jwtgenerator')
const sms=require('./sms');
const rateLimit = require('express-rate-limit')
const createAccountLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 10, // Limit each IP to 5 create account requests per `window` (here, per hour)
	message:
		'Too many accounts created from this IP, please try again after an hour',
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
router.post('/register/sendotp',createAccountLimiter, async(req,res)=>{
    try {
          const userDetails={
             firstName:firstName,
              lastName:lastName,
              phone:phone,
               email:email,
              password:password,
             street:street,
              pincode:pincode,
             state:state,
            country:country}=req.body;
      
         const user=await pool.query("SELECT * FROM usertable WHERE email=$1",[email]);
        if(!user)
          throw new Error("query request not performed properly")
        if(user.rows.length!=0){
            res.status(401).json({message:'user already exists'});
            return;
        }
      
  const saltRound=10;
 
  const salt=await bcrypt.genSalt(saltRound);
  
  const cryptedPassword=await bcrypt.hash(password,salt);
  
  const newUser=await pool.query("INSERT INTO usertable (first_name,last_name,phone,email,password,street,pincode,state,country,isactive) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) returning *",[firstName,lastName,phone,email,cryptedPassword,street,pincode,state,country,'false']);

    
       //otp logic goes here
  await sms(userDetails); 
       
  res.status(200).json(newUser);
  
       
  
        
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})




router.post('/register/verify/:id',createAccountLimiter,async (req,res)=>{
  
    try{
      let success=false;
      const emailquery=await pool.query("SELECT email from usertable where user_id=$1",[req.params.id]);
      if(emailquery.rows.length==0){
        res.status(404).json({message:'user not found'})
        return;
      }
      const email=emailquery.rows[0].email;
      const otpquery=await pool.query("SELECT otp from otptable where email=$1",[email]);
      //console.log(otpquery.rows[0].otp);
      const otpbody=req.body.otp;
      //console.log(otpbody);
      if(otpbody!=otpquery.rows[0].otp)
        res.status(403).json({message:'wrong otp'})

      if(otpbody==otpquery.rows[0].otp){
        const validate=pool.query("UPDATE usertable SET isactive=$1 where user_id=$2",['true',req.params.id]);
       success=true;
      }
      
       
      if(success==true){
        const token=jwtGenerator(req.params.id,email);
        const deleteotp=pool.query("DELETE from otptable where email=$1",[email]);
        res.json({'token':token});

      }  

      
      
  } catch (error) {
    console.log(error);
  }
        

    

})

module.exports=router;