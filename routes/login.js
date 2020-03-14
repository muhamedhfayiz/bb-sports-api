const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Register = require('../models/register.js');
const Nexmo = require('nexmo');


const nexmo = new Nexmo({
    apiKey: 'c516bbff',
    apiSecret: 'O5XYAAvpoEYXcmwA',
});

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
        otpVerified: req.body.otp
    });

    let saved = await newUser.save();
    return (saved);
}


router.post('/addFavorite', (req, res) => {
    phoneNumberExist(req).then(data => {
        data[0].favorites.unshift(req.body.stdiumId);
        data[0].save().then(data => {
            res.json({ code: 200, data: data });
        });
    });
});


router.post('/removeFavorite', (req, res) => {
    phoneNumberExist(req).then(data => {
        for (let i = 0; i < data[0].favorites.length; i++) {
            if (data[0].favorites[i] === req.body.stdiumId) {
                data[0].favorites.splice(i, 1);
            }
        }
        data[0].save().then(data => {
            res.json({ code: 200, data: data });
        });
    });
});


router.post('/editUser', (req, res) => {
    phoneNumberExist(req).then(data => {

        data[0].name = req.body.name;
        data[0].favoriteClub = req.body.favoriteClub;
        data[0].favoriteTeam = req.body.favoriteTeam;
        data[0].age = req.body.age;
        data[0].position = req.body.position;


        data[0].save().then(data => {
            res.json({ code: 200, data: data });
        });
    });
});


// ------------------------- get array users by id ------------------------------
router.post('/getUserArray', (req, res) => {
    let arrayUser = [];
    if (req.body.users.length == 0) {
        res.json(arrayUser);
    } else {
        for (var i = 0; i < req.body.users.length; i++) {
            Register.find({ _id: req.body.users[i].userId }).then(data => {
                arrayUser.unshift(data[0]);
                if (arrayUser.length === req.body.users.length) {
                    res.json(arrayUser);
                }
            });
        }
    }
});


// ---------------- sent OTP -------------------
router.post('/sentOTP', (req, res) => {
    res.json({ code: 200, message: { request_id: '2222222', status: '0' } });
    // nexmo.verify.request({
    //     number: req.body.phoneNumber,
    //     brand: 'BB Sports',
    //     code_length: '4'
    // }, (err, result) => {
    //     if (err) {
    //         res.json({ code: 400, message: err });
    //     }
    //     res.json({ code: 200, message: result });
    // });
});


// ---------------- verify OTP -------------------
// router.post('/verifyOTP', (req, res) => {
//     nexmo.verify.check({
//         request_id: req.body.request_id,
//         code: req.body.code
//     }, (err, result) => {
//         if (err) {
//             res.json({ code: 400, message: err });
//         }
//         res.json({ code: 200, message: result });
//     });
// });


router.post('/verifyOTP', (req, res) => {
    if (req.body.code == '1234') {
        res.json({ code: 200, message: { status: '0' } });
    } else {
        res.json({ code: 400, message: { status: '1' } });
    }
});

module.exports = router;