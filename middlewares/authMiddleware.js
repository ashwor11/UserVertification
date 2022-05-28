const jwt = require('jsonwebtoken')
const User = require('../models/users')
const dotenv = require('dotenv')

dotenv.config();

const requireAuth = (req,res,next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.JWT_LOGIN_SECRET, (err,decoded)=>{
            if(err){
                console.log(err)
                res.send('not authorized')
            }else{
                console.log(decoded);
                next();
            }

        });
    }else{
        res.send('not authorized')
   
    }
}

const checkUser =(req,res,next)=>{
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, process.env.JWT_LOGIN_SECRET, async(err,decoded)=>{
            if(err){
                res.locals.user = null;
            }else{
                let user =await User.findById(decoded.id)
                res.locals.user = user;
                next();
            }

        });
    }else{
        res.locals.user = null;
   
    }

}

module.exports={
    requireAuth,
    checkUser
}