const pool=require('../db');
const verifyToken=require('../auth/verifyToken');
const express=require('express')
const router=express.Router();
const app=express();
const path=require("path")
const fs=require("fs");

let options = {
   dotfiles: "ignore", //allow, deny, ignore
   etag: true,
   extensions: ["png"],   //if no extention, add these
   index: false, //to disable directory indexing
   redirect: false
 };
 app.use(express.static("uploads",options));

router.get('/:category',async(req,res)=>{
  const category=req.params.category;
  
  const categorytablequery=await pool.query("SELECT a.imagename,b.name,b.price,b.discount,b.priceafterdiscount,b.created_time,b.seller_id from imagetable a RIGHT JOIN producttable b on a.product_id=b.product_id where category=$1 AND a.type=$2 limit 5",[category,'avatar']);
  const categoryrows=categorytablequery.rows;
  console.log(categoryrows);
  res.status(201).json(categoryrows);


}
)

module.exports=router;