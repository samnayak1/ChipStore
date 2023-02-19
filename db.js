



require('dotenv').config();
var pg = require('pg');
const Pool=require('pg').Pool;
const pool=new Pool({
  user:process.env.DBUSER,
  password:process.env.DBPASSWORD,
  host:process.env.DBHOST,
  port:process.env.DBPORT,
  database:process.env.DBDATABASE

});

module.exports=pool;


