const jwt=require('jsonwebtoken');
require('dotenv').config();
const pool=require('../db');
module.exports=async(req,res,next)=>{
    try {
        const jwtToken=req.header("token");
  const user=jwt.verify(jwtToken,process.env.JWTSECRET);
  const sellerid=user.id;
  const sellerquery=await pool.query("SELECT seller_id from producttable where product_id=$1",[req.params.id]);
  if(sellerid!=sellerquery.rows[0].seller_id){
     res.status(403).json({message:'not authorized'})
  }
 next();

} catch (error) {
    return res.status(500).json({message:error.message});
}

}