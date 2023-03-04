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
  // const footwearquery=await pool.query("SELECT name,price,discount,priceafterdiscount,created_time,seller_id from producttable where category=$1 limit 5",['footwear']);
  //const footwear=footwearquery.rows[0];
  const categorytablequery=await pool.query("SELECT a.imagename,b.name,b.price,b.discount,b.priceafterdiscount,b.created_time,b.seller_id from imagetable a RIGHT JOIN producttable b on a.product_id=b.product_id where category=$1 AND a.type=$2 limit 5",[category,'avatar']);
  const categoryrows=categorytablequery.rows;
  console.log(categoryrows);
  res.status(201).json(categoryrows);
 // res.sendFile(path.join(__dirname, '..', 'uploads', '1af6d2ef-7c17-4a7e-8a71-b587cd2f3b53-2.PNG'))
 //const imgfilepath=path.join(__dirname, '..', 'uploads', '1af6d2ef-7c17-4a7e-8a71-b587cd2f3b53-2.PNG');
 /* fs.readFile(imgfilepath,(err,content)=>{
  if(err){
    res.writeHead(404,{"Content-type":"text/html"})
    res.end("<h1>No such image found</h1>")
  }
  else{

   //res.writeHead(200,{"Content-type":"image/png"});
   
    
  } 
})*/

}
)

module.exports=router;