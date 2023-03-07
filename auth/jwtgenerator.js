const jwt=require('jsonwebtoken')

require('dotenv').config();

function jwtGenerator(id,email){

    const payload={
        id:id,
        email:email
    }

    return jwt.sign(payload,process.env.JWTSECRET,{expiresIn:'60d'})


}

module.exports=jwtGenerator;