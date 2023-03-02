const pool=require('../db');
const verifyToken=require('../auth/verifyToken');
const express=require('express')
const router=express.Router();
const app=express();
const path=require("path")

let options = {
   dotfiles: "ignore", //allow, deny, ignore
   etag: true,
   extensions: ["png"],   //if no extention, add these
   index: false, //to disable directory indexing
   redirect: false
 };
 app.use(express.static("uploads",options));

router.get('/footwear',async(req,res)=>{
   //const footwearquery=await pool.query("SELECT name,price,discount,priceafterdiscount,created_time,seller_id from producttable where category=$1 limit 5",['footwear']);
   //const footwear=footwearquery.rows[0];
  //let img=`<img src='uploads/1af6d2ef-7c17-4a7e-8a71-b587cd2f3b53-2.PNG' />` ;
  // res.status(200).json(footwearquery);
  res.sendFile(path.join(__dirname, '..', 'uploads', '1af6d2ef-7c17-4a7e-8a71-b587cd2f3b53-2.PNG'))
 
}
)

module.exports=router;