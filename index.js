const express=require('express')
const app=express();
const cors=require('cors');
const pool=require('./db');
const path=require("path");
require('dotenv').config();
app.use(express.json());
app.use(cors());

port=process.env.PORT;

 const authRoutes=require('./auth/auth.js')
const loginRoute=require('./auth/login.js')
const getUserDetails=require('./auth/getUserDetails');
const sellerauthrouter=require('./auth/sellerauth')
const resourcesRoute=require('./resources/resources');
const sellerroute=require('./sellerroutes/create');
const multipleImageRoute=require('./sellerroutes/multiplefileupload');
app.use('/auth/getuser',getUserDetails);
app.use('/auth/seller',sellerauthrouter);
app.use('/auth',authRoutes);
app.use('/auth/login',loginRoute);
app.use('/resources',resourcesRoute);
app.use('/seller',sellerroute)
app.use('/seller/multipleimages',multipleImageRoute)
app.use("/uploads", express.static(path.join(__dirname,"uploads")));


app.get('/images/:filename',async (req,res)=>{
    const filename=req.params.filename;
    res.sendFile(path.join(__dirname,"uploads",filename));

}) 


app.listen(port,()=>{
    console.log(`listening at port ${port}`);
})