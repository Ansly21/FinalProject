require("dotenv").config();
const path = require('path');
const express = require('express'); 
const mongoose = require('mongoose')
const User = require('./model/user') 
const Product = require('./model/foodprod')
const Address = require('./model/address')
const Payment = require('./model/paymethod')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')


const app = express()

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(result => {
    console.log("connected")
    app.listen(process.env.PORT || 3000, err => {
        if(!err) console.log('listening')
    })
})
.catch(err => {
    console.log("failed")
})

const JWT_SECRET = 'adjs0asfkjkoldmokjadjasopd'


app.use(express.json())
const { isErrored } = require('stream')


let publicDir = path.join(__dirname, "/public")
app.use(express.static(publicDir))

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index.ejs');
})

app.get('/home', (req, res) => {
    res.render('index.ejs');
})

app.get('/menu', (req, res) => {
    res.render('menu.ejs')
})

app.get('/promos', (req, res) => {
    res.render('promos.ejs');
})

app.get('/silog', (req, res) => {
    res.render('silog.ejs');
})

app.get('/side-orders', (req, res) => {
    res.render('side-orders.ejs');
})

app.get('/drinks', (req, res) => {
    res.render('drinks.ejs');
})

app.get('/sign-in', (req, res) => {
    res.render('sign-in.ejs');
})

app.post('/sign-in', async(req, res) => {   
    const {email, password} = req.body
    const user = await User.findOne({email}).lean()

    if(!user) {
        return res.json({status: 'error', error: "Invalid email/password"})
    }

    if(await bcrypt.compare(password, user.password)) {

        const token = jwt.sign({
            id: user._id, 
            username: user.username
        }, 
        JWT_SECRET
    )

        return res.json({status: 'ok', data: token})
    }

    res.json({status: 'error', error: "Invalid email/password"})
})

app.get('/create-account', (req, res) => {
    res.render('create-account.ejs');
})

app.post('/create-account', async(req, res) => {
    const {username, email, password: plainTextPassword} = req.body

    if(!username || typeof username !== 'string') {
        return res.json({status: 'error', error: 'Invalid username'})
    }

    if(plainTextPassword.length < 5) {
        return res.json({status: 'error', error:"Password too short"})
    }

    const password = await bcrypt.hash(plainTextPassword, 3)

    try {
        const response = await User.create({
            username,
            email,
            password
        })
        console.log("User created successfully", response)
    } catch(error) {
        if(error.code === 11000) {
            return res.json({status: 'error', error: "Username/Email already in use"})
        }
        throw error
    }

    res.json({status: 'ok'})
})

app.get('/forgot-password', (req, res) => {
    res.render('forgot-password.ejs');
})

app.get('/rate-us', (req, res) => {
    res.render('rate-us.ejs');
})

app.get('/about-us', (req, res) => {
    res.render('about-us.ejs');
})

app.get('/address-details', (req, res) => {
    res.render('address-details.ejs');
})

app.use(bodyParser.urlencoded({extended: true}))
app.post('/address-details', (req, res) => {
    let newAddress = new Address({
        Province: req.body.province,
        City: req.body.city,
        Barangay: req.body.barangay, 
        Houseno: req.body.houseno,
        Street: req.body.street,
        Landmark: req.body.landmark,
    })
    newAddress.save();
    res.redirect('/payment-method')
})



app.get('/silog2', (req, res) => {
    res.render('silog2.ejs');
})

app.get('/cart', (req, res) => {
    res.render('cart2.ejs');
})

app.get('/payment-method', (req, res) => {
    res.render('payment.ejs');
})

app.post('/payment-method', (req, res) => {
    let date = new Date();
	let current_date = (date.getMonth()+1)+"-"+date.getDate()+"-"+ date.getFullYear()
    
    let time = new Date();
	var current_time = time.getHours()+":"+time.getMinutes()+":"+ time.getSeconds();

    let newPayment = new Payment({
        payment: req.body.payS,
        date: current_date,
        time: current_time
    })
    newPayment.save();
    res.redirect('/home')
})


