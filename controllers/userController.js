const res = require('express/lib/response');
const jwt = require('jsonwebtoken');
const User = require('../models/users')
const userService = require('../services/userService');
const dotenv = require('dotenv')


dotenv.config();

maxAge = 60*60*24;


const login = (req,res)=>{
    const {username,password,email} = req.body;
    try{
        var user = User.login(username, email, password);
        const token = userService.createLoginJwt(user._id);
        res.cookie('jwt',token,{httpOnly: true, maxAge: maxAge * 1000});
        res.send('succesfully loginned')

    }catch (err){
        console.log(err)
        res.status(400).send(err.message);
    }
}

const logout = (req,res)=>{
    res.cookie('jwt', '', {maxAge:1})
    res.send('successfully logouted')
}

const signUpPost = (req, res)=>{
    userService.create(req.body)
    .then((result)=>{res.json({})})
    .catch((err)=>{console.log(err)})
}

const _delete = async (req, res)=>{
    res.send(userService._delete(req.body.username))
    
}

const get = async (req,res)=>{
    userService.get(req.query.username)
    .then((result)=>{res.json(result)})
    .catch((err)=>{console.log(err)})
}

const verify = async (req,res)=>{
    token = req.query.id;
    if (token) {
        try {
            jwt.verify(token, process.env.JWT_MAIL_SECRET_KEY, async (e, decoded) => {
                if (e) {
                    return res.sendStatus(403)
                } else {
                    id = decoded.id;
                    console.log(id)
                await User.findByIdAndUpdate(id,{isVerified:true})
                .then((result)=>{res.status(200).send('User verified succesfully.')})
                .catch((err)=>{res.status(500).send(err.message)})
                }

            });
        } catch (err) {
            return res.sendStatus(403)
        }
    } else {
        return res.sendStatus(403)
    }
}

module.exports = {
    signUpPost,
    _delete,
    get,
    verify,
    login,
    logout,

}




