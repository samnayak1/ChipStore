const pool=require('../db');
const verifyToken=require('../auth/verifyToken');
const express=require('express')
const router=express.Router();

router.get('/footwear',async(req,res)=>{
   const footwearquery=await pool.query("SELECT name,price,discount,priceafterdiscount,created_time,seller_id from producttable where category=$1 limit 5",['footwear']);
   const footwear=footwearquery.rows[0];
   res.status(200).json(footwear);
}
)

module.exports=router;