const express=require('express');
require("dotenv").config();
const multer = require("multer");
const uuid = require("uuid").v4;
const router=express.Router();
const pool=require('../db');
const app=express();
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
  res.status(200).json({'product_id':productId});
} catch (error) {
    res.status(500).json({'message':error.message});
}
})




 const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
   filename: async (req, file, cb) => {
     const { originalname } = file;
     const productid=req.params.id;
     filedesignation=`${uuid()}-${originalname}`;
     const insertinto=await pool.query("INSERT into imagetable(product_id,imagename) values ($1,$2)",[productid,filedesignation]);
     cb(null, filedesignation);
   },
 });

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};

// ["image", "jpeg"]

const upload = multer({                 //configure multer to mention the storage and filters
  storage,
  fileFilter,
  limits: { fileSize: 1000000000, files: 2 },
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

router.post("/create/image/:id",upload.array("file"), async (req, res) => {
  try {

   return res.json({ status: "success" });
  } catch (err) {
    console.log(err);
   }
 });

 router.get('/getimage',(req,res)=>{
  //output=`<h1>`
  res.send(output);
 })

module.exports=router;
