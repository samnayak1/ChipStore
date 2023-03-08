const pool=require('../db');
const verifyToken=require('../auth/verifyToken');
const express=require('express')
const router=express.Router();
const app=express();
const path=require("path")

const jwt=require('jsonwebtoken')


router.get('/category/:categoryname/:pagesperpage/:pagenumber',async(req,res)=>{
  const category=req.params.categoryname;
  
  const categorytablequery=await pool.query("SELECT a.product_id,a.imagename,b.name,b.price,b.discount,b.priceafterdiscount,b.created_time,b.seller_id from imagetable a RIGHT JOIN producttable b on a.product_id=b.product_id where category=$1 AND a.type=$2 limit $3 OFFSET ($4 - 1) * $3",[category,'avatar',req.params.pagesperpage,req.params.pagenumber]);    //SELECT *FROM items LIMIT {itemsPerPage} OFFSET {(page - 1) * itemsPerPage}
  const categoryrows=categorytablequery.rows;
  
  res.status(201).json(categoryrows);
}
)

router.get('/product/:productid',verifyToken,async(req,res)=>{
  const productid=req.params.productid;
  const jwtToken=req.header("token");
  const payload=jwt.verify(jwtToken,process.env.JWTSECRET);
  const id=payload.id;
      const productquery=await pool.query("SELECT a.product_id,a.name,a.price,a.category,a.discount,a.created_time,b.email,c.imagename from producttable a JOIN sellertable b ON a.seller_id=b.seller_id JOIN imagetable c ON c.product_id=a.product_id where a.product_id=$1",[productid]);
      const visitedquery=await pool.query("INSERT INTO visitedtable(user_id,product_id) values ($1,$2)",[id,productid]);
      const productrow=productquery.rows[0];

res.status(200).json(productrow);


})

router.get('/trending/:pagesperpage/:pagenumber',async(req,res)=>{  
  const trendquery=await pool.query("SELECT a.product_id,b.name,b.price,b.priceafterdiscount,b.category,count(a.product_id) as numberoftimesviewed FROM visitedtable a LEFT JOIN producttable b ON a.product_id=b.product_id WHERE a.visited_time_utc BETWEEN NOW() - INTERVAL '30 days' AND NOW() GROUP BY a.product_id,b.name,b.price,b.priceafterdiscount,b.category ORDER BY count(a.product_id) DESC limit $1 OFFSET ($2 - 1)*$1",[req.params.pagesperpage,req.params.pagenumber])
  res.status(201).json(trendquery.rows);
})

module.exports=router;


