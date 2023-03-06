const pool=require('../db');
const verifyToken=require('../auth/verifyToken');
const express=require('express')
const router=express.Router();
const app=express();
const path=require("path")
const fs=require("fs");



router.get('/category/:categoryname',async(req,res)=>{
  const category=req.params.categoryname;
  
  const categorytablequery=await pool.query("SELECT a.imagename,b.name,b.price,b.discount,b.priceafterdiscount,b.created_time,b.seller_id from imagetable a RIGHT JOIN producttable b on a.product_id=b.product_id where category=$1 AND a.type=$2 limit 5",[category,'avatar']);
  const categoryrows=categorytablequery.rows;
  
  res.status(201).json(categoryrows);
}
)
router.get('/product/:productid',verifyToken,async(req,res)=>{
  const productid=req.params.productid;
      const productquery=await pool.query("SELECT a.name,a.price,a.category,a.discount,a.created_time,b.email from producttable a JOIN sellertable b on a.seller_id=b.seller_id where a.product_id=$1",[productid]);
      
      const productrow=productquery.rows[0];

res.status(200).json(productrow);


})

module.exports=router;


