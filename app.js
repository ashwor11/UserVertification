const express = require('express');
var morgan = require('morgan');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
const userRoute = require('./routes/userRoute');
const bodyParser = require('body-parser');
const {checkUser} = require('./middlewares/authMiddleware')
const cookieParser = require('cookie-parser')



dotenv.config();


const dbURL = process.env.DB_CONNECTION_URL;
const PORT = process.env.PORT || 3000;



const app = express();





mongoose.connect(dbURL)
    .then((result)=>{app.listen(PORT)})
    .catch((err)=>{console.log(err)})

app.use(express.urlencoded({extended: false}))

app.use(morgan('tiny'))

app.use(express.static('public'))

app.set('view engine', 'ejs');

app.use(cookieParser())
app.use('*',checkUser);

app.use('/user',userRoute)

app.get('/', (req,res)=>{
    res.render('index');
})




