


/*

var pg = require('pg');

var conString = "postgres://elcaakle:oliBfN1v8h7-XPE3_UN3LJeT3-pf10aL@drona.db.elephantsql.com/elcaakle"
var client = new pg.Client(conString);
client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
});

exports.client=client;


*/
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


