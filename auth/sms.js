const nodemailer=require('nodemailer')
const pool = require('../db');
require('dotenv').config();

async function sms(userDetails){
  let transporter = nodemailer.createTransport({
    service:'hotmail',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user:process.env.ETHERALEMAIL, // generated ethereal user
      pass: process.env.ETHERALPASSWORD, // generated ethereal password
    },
  });

  let otpGenerated=Math.floor(100000 + Math.random() * 900000);
  const sendingEmail=await pool.query("INSERT INTO otptable (email,otp) VALUES ($1,$2)",[userDetails.email,otpGenerated]);
  var output=`<h2> user otp is ${otpGenerated}<h2> please enter this into the website`;
  console.log(otpGenerated);
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.ETHERALEMAIL, // sender address
    to: userDetails.email, // list of receivers
    subject: "Registration to Chip", // Subject line
    text: "Enter OTP in the website", // plain text body
    html: output , // html body
  });



 
  
  console.log("Message sent: %s", info.messageId);


}

module.exports=sms;