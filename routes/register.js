const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Register = require('../models/register.js');

//---------------------- posting user data ---------------------------------------------
router.post('/register', (req, res, next) => {
    newRegister(req).then(data => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

async function newRegister(req) {
    let newUser = new Register({
        role: req.body.role,
        name: req.body.name,
        profilePic: req.body.profilePic,
        phoneNumber: req.body.phoneNumber,
        otpVerified: false
    });

    let hash = bcrypt.hashSync(req.body.password, 10);
    newUser.password = hash;

    let saved = await newUser.save();
    return (saved);
}



module.exports = router;