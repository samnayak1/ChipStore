const express=require('express');
require("dotenv").config();
const multer = require("multer");
const uuid = require("uuid").v4;
const router=express.Router();
const pool=require('../db');
const app=express();
const jwt=require('jsonwebtoken');
const verifyTokenSeller=require('../auth/verifytokenseller')
const path=require("path");
const host=process.env.HOST;
const port=process.env.PORT;
const protocol=process.env.PROTOCOL;
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
  const updatecountofavailableproducts=await pool.query("INSERT INTO availabletable(product_id,quantity) values ($1,$2) returning *",[productId,quantity])
// console.log(createlogsellingquery);
  res.status(200).json({'product_id':productId});
} catch (error) {
    res.status(500).json({'message':error.message});
}
})

router.put('/adddiscount/:id',verifyTokenSeller,async(req,res)=>{
  const jwtToken=req.header("token");
  const user=jwt.verify(jwtToken,process.env.JWTSECRET);
  const sellerid=user.id;
  const sellerquery=await pool.query("SELECT seller_id from producttable where product_id=$1",[req.params.id]);
  if(sellerid!=sellerquery.rows[0].seller_id)
     res.status(403).json({'message':'not authorized'})

  const newdiscount=req.body.discount;
  const discountquery=await pool.query("UPDATE producttable SET discount=$1 WHERE product_id=$2 returning *",[newdiscount,req.params.id]);

  res.status(204).json({'message':'updated'})
})
router.put('/removediscount/:id',verifyTokenSeller,async(req,res)=>{
  const jwtToken=req.header("token");
  const user=jwt.verify(jwtToken,process.env.JWTSECRET);
  const sellerid=user.id;
  const sellerquery=await pool.query("SELECT seller_id from producttable where product_id=$1",[req.params.id]);
  if(sellerid!=sellerquery.rows[0].seller_id)
     res.status(403).json({'message':'not authorized'})
  const discountquery=await pool.query("UPDATE producttable SET discount=$1 WHERE product_id=$2 returning *",[0,req.params.id]);
  res.status(204).json({message:'updated'})
  
})




//single upload starts here
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");                 //cb(error, upload destination file)
  },
   filename: async (req, file, cb) => {
     const { originalname } = file;       //destructure the file object to get originalname
     const productid=req.params.id;
     filedesignation=`${uuid()}-${originalname}`;
     console.log(filedesignation)
    
     const imgfilepath=`${protocol}://${host}:${port}/images/${filedesignation}`;  //http://localhost:5001/images/5c03383a-f21f-4c7c-a11c-1bc0fdc57605-agg.jpg
     
     const insertinto=await pool.query("INSERT into imagetable(product_id,imagename,type) values ($1,$2,$3) returning *",[productid,imgfilepath,'avatar']);
    console.log(insertinto);
     cb(null, filedesignation);         //cb(error, name of file)
   },
 });

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {      // ["image", "jpeg"] or ["image","png"]
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};



const upload = multer({                 //configure multer to mention the storage and filters
  storage,
  fileFilter,
  limits:{fileSize: 10*1024*1024,files:1},
});



app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "file is too large",
      });
    }

    if (error.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        message: "File limit reached",
      });
    }

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({
        message: "File must be an image",
      });
    }
  }
});

router.post("/create/avatar/:id",verifyTokenSeller,upload.single("file"),async (req, res) => {
  try {

   return res.json({ status: "success" });
  } catch (err) {
    res.json({'error':err});
   }
 });


 



module.exports=router;
