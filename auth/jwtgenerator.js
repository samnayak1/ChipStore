const jwt=require('jsonwebtoken')

require('dotenv').config();

function jwtGenerator(email){

    const payload={
        email:email
    }

    return jwt.sign(payload,process.env.JWTSECRET,{expiresIn:'60d'})


}

module.exports=jwtGenerator;