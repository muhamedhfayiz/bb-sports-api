const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Register = require('../models/register.js');

//---------------------- login---------------------------------------------
router.post('/login', (req, res) => {
    phoneNumberExist(req).then(data => {
        if (data.length !== 0) {
            res.json({ code: 200, msg: "login succesfull", data: data[0] });
        } else {
            res.json({ code: 303, msg: "phone number not exist" });
        }
    }).catch((err) => {
        res.json(err);
    });
});

//---------------------- check phone number exist ---------------------------------------------
router.post('/check-phonenumber-exist', (req, res) => {
    phoneNumberExist(req).then(data => {
        if (data.length !== 0) {
            res.json({ code: 304, msg: "phone number exist" });
        } else {
            res.json({ code: 303, msg: "phone number not exist" });
        }
    });
});


//---------------------- register new user ---------------------------------------------
router.post('/register', (req, res) => {
    newRegister(req).then(data => {
        res.json({ code: 304, msg: "registration successful", data: data });
    });
});

async function phoneNumberExist(req) {
    let data = Register.find({ phoneNumber: req.body.phoneNumber });
    return data;
}

async function newRegister(req) {
    let newUser = new Register({
        role: req.body.role,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        otpVerified: false
    });

    let saved = await newUser.save();
    return (saved);
}



module.exports = router;