const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('../models/users')
const nodemailer = require('nodemailer')

dotenv.config();


module.exports = {
    create,
    update,
    _delete,
    get,
    createLoginJwt
}




async function create(userParam){

    //Checking for the username or email taken or not
    if(await User.findOne({$or:[{'email':userParam.email},{'username':userParam.username}]})){
        throw 'Username or email already taken.'
    }

    const user = new User(userParam);


    user.save()
    .then((result)=>{sendMail(userParam.email, "Confirm your Photo Gallery account.", ("You can verify your account by clicking this link: <a href=\""+emailVertificationJwt(user._id)+"\"> Verify your account </a>")); return user})
    .catch((err)=>{throw err})

}


async function update(id, userParam){

    const user = User.findById(id);

    Object.assign(user,userParam);

}

async function _delete(username) {
    await User.findOneAndRemove({"username":username})
    .then((result)=>{return "user deleted succesfully"})
    .catch((err)=>{return "an error occured. cant delete user"});
}

async function get(username){
    return await User.findOne({username:username});
}


function sendMail(to,subject,html,text){

    let transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    })
    
    let mailOptions = {
        from: "Photo Gallery <" + process.env.EMAIL+">",
        to: to,
        subject: subject,
        text: text,
        html: html,
    }

    transporter.sendMail(mailOptions);
}

function emailVertificationJwt(id){
    var date = new Date();

    const token = jwt.sign({id:id}, process.env.JWT_MAIL_SECRET_KEY, {expiresIn: '1d'});

    var url = "http://"+process.env.BASE_URL + "user/verify?id=" + token;

    return url;
}

function createLoginJwt(id){
    return token = jwt.sign({id:id}, process.env.JWT_LOGIN_SECRET, {expiresIn: '7d'});
}
