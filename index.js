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
app.use('/auth',authRoutes);
app.use('/auth/login',loginRoute);

app.get('/',async (req,res)=>{
    const allUser=await pool.query('SELECT * FROM testt;');
    res.json(allUser.rows);

})








app.listen(port,()=>{
    console.log(`listening at port ${port}`);
})