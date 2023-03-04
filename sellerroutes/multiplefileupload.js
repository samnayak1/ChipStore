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

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");                 //cb(error, upload destination file)
  },
   filename: async (req, file, cb) => {
     const { originalname } = file;       //destructure the file object to get originalname
     const productid=req.params.id;
     filedesignation=`${uuid()}-${originalname}`;
     const imgfilepath=path.join(__dirname, '..', 'uploads', filedesignation);
     const insertinto=await pool.query("INSERT into imagetable(product_id,imagename,type) values ($1,$2,$3) returning *",[productid,imgfilepath,'other']);
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
  limits: { fileSize: 1000000000, files: 3 },
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


  router.post("/:id",verifyTokenSeller,upload.array("file",3), async (req, res) => {
  try {

   return res.json({ status: "success" });
  } catch (err) {
    res.json({'error':err});
   }
 }); 

 



module.exports=router;
