const express=require('express');
const router=express.Router();
const pool=require('../db');
const jwt=require('jsonwebtoken');
const verifyTokenSeller=require('../auth/verifytokenseller')
router.post('/create',verifyTokenSeller,async(req,res)=>{ //add verifytokenseller afterwards
   try {
    
   
   
    const {name,price,discount,category,quantity}=req.body;
  const jwtToken=req.header("token");

  const user=jwt.verify(jwtToken,process.env.JWTSECRET);
  const email=user.email;
  const idquery=await pool.query("SELECT seller_id from sellertable where email=$1",[email]);

  const id=idquery.rows[0].seller_id;
  
  const createproductquery=await pool.query("INSERT INTO producttable(name,price,discount,seller_id,category) values ($1,$2,$3,$4,$5) returning *",[name,price,discount,id,category]);
const productId=createproductquery.rows[0].product_id;
  const createlogsellingquery=await pool.query("INSERT INTO sellingtable(seller_id,product_id,quantity) values ($1,$2,$3) returning *",[id,productId,quantity] );
  console.log(createlogsellingquery);
  res.status(200).json({message:'product created'});
} catch (error) {
    res.status(500).json({message:error.message});
}

    
})


module.exports=router;
