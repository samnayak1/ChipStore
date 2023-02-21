const express=require('express')
const app=express();
const cors=require('cors');
const pool=require('./db');
require('dotenv').config();
app.use(express.json());
app.use(cors());
port=process.env.PORT;

const authRoutes=require('./auth/auth.js')
const loginRoute=require('./auth/login.js')
const verifyToken=require('./auth/verifyToken');
const verifyTokenSeller=require('./auth/verifytokenseller');
const sellerauthrouter=require('./auth/sellerauth')
const resourcesRoute=require('./resources/resources');
const sellerroute=require('./sellerroutes/create');
app.use('/auth/seller',sellerauthrouter);
app.use('/auth',authRoutes);
app.use('/auth/login',loginRoute);
app.use('/resources/',resourcesRoute);
app.use('/seller',sellerroute)


app.get('/',verifyToken,async (req,res)=>{
    const allUser=await pool.query('SELECT * FROM testt;');
    res.json(allUser.rows);

})

app.get('/sellertest',verifyTokenSeller,async (req,res)=>{
    const allUser=await pool.query('SELECT * FROM testt;');
    res.json(allUser.rows);

})








app.listen(port,()=>{
    console.log(`listening at port ${port}`);
})