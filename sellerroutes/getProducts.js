const express=require('express');
const verifytokenseller = require('../auth/verifytokenseller');
const router=express.Router();
const pool=require('../db')
const jwt=require('jsonwebtoken')
router.get('/',verifytokenseller,async (req,res)=>{
    try{
    const token=req.header('token')
    const payload=jwt.verify(token,process.env.JWTSECRET);
    const id=payload.id;
    const getProductQuery=await pool.query("SELECT DISTINCT ON (a.product_id) a.product_id,a.name,a.price,a.category,a.seller_id,a.available,a.created_time,a.discount,a.priceafterdiscount,b.imagename FROM producttable a LEFT JOIN imagetable b ON a.product_id=b.product_id where seller_id=$1 ",[id])
   // console.log(getProductQuery.rows)
/* product_id": "96e065c4-4e86-4342-bf4a-e811a19e4d13",
            "name": "Puma Das",
            "price": "20.00",
            "category": "footwear",
            "seller_id": "f86a3d56-ee52-418b-b5da-5975986585d1",
            "available": null,
            "created_time": "2023-03-09T07:29:15.670Z",
            "discount": "5.00",
            "priceafterdiscount": "19.00",
            "imagename":'http://localhost:5001/images/72a94ba5-f362-4026-9ee6-05137cdcdeaa-down bad.PNG'*/
     res.status(200).json({'product':getProductQuery.rows})
    }

     catch(e){
        res.status(500).json({message:'error'+e})
     }
 
   


})




module.exports=router;