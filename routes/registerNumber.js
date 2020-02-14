const express = require('express');
const router = express.Router();




// ----------------jwt token by using passport--------------------------------
var jwt = require('jsonwebtoken');
var passport = require("passport");
var passportJWT = require("passport-jwt");

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'WSJDHUASJJ253985sjjUAG';

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    RegisterNumber.find({ "_id": jwt_payload.id }, function (err, user) {
        if (user) {
            if (user.length !== 0) {
                next(null, user);
            } else {
                next(null, false);
            }
        }
    });
});
passport.use(strategy);
router.use(passport.initialize());


// --------------------------------------------- retriving data---------------------------------------------
router.get('/registerNumber', (req, res, next) => {
    RegisterNumber.find(function (err, data) {
        res.json(data);
    })
});

// -------------------------- login --------------------------------------
router.post('/login', (req, res, next) => {
    checkPhoneNumberExist(req).then(data => {
        if (data.length !== 0) {
            if (data[0].password === req.body.password && data[0].countryCode == req.body.countryCode) {
                var payload = { id: data[0].userId };
                var token = jwt.sign(payload, jwtOptions.secretOrKey);
                res.json({ code: 200, token: token, userId: data[0].userId });
            } else {
                res.json(401);
            }
        } else {
            res.json('No user found');
        }
    }).catch((err) => {
        res.send(err);
    })
});

// -------------------------- skip --------------------------------------
router.post('/skip', (req, res, next) => {
    var payload = { id: '5d91f8dfb53c150017ad9b8e' };
    var token = jwt.sign(payload, jwtOptions.secretOrKey);
    res.json({ code: 200, token: token, userId: '0000000000' });
});


// -------------------------- skip --------------------------------------
router.post('/adminLogin', (req, res, next) => {
    if (req.body.admin === 'fayiz' && req.body.password === 'Pinboard1$') {
        var payload = { id: '5d91f8dfb53c150017ad9b8e' };
        var token = jwt.sign(payload, jwtOptions.secretOrKey);
        res.json({ code: 200, token: token });
    } else {
        res.json('auth error, Admin can only add category');
    }
});


// -------------------------------------- register new number -----------------------------
router.post('/registerNumber', (req, res, next) => {
    checkPhoneNumberExist(req).then(data => {
        if (data.length === 0) {
            newNumberRegister(req).then(regitser => {
                var payload = { id: regitser._id };
                var token = jwt.sign(payload, jwtOptions.secretOrKey);
                res.json({ code: 200, token: token, userId: regitser._id });
                regitser.userId = regitser._id;
                regitser.save();
            });
        } else {
            var payload = { id: data[0].userId };
            var token = jwt.sign(payload, jwtOptions.secretOrKey);

            if (data[0].otpVerified) {
                if (data[0].phoneNumber === req.body.phoneNumber && data[0].countryCode === req.body.countryCode) {
                    if (data[0].password) {
                        res.json({ code: 300, msg: 'Phone number already exist' });
                    } else {

                        res.json({ code: 310, msg: 'Password not set', userId: data[0].userId, token: token });
                    }

                } else {
                    res.json({ code: 309, msg: 'Phone number invalid' });
                }
            } else {
                res.json({ code: 320, msg: 'OTP not verified', userId: data[0].userId, token: token });
            }
        }
    }).catch((err) => {
        res.send(err);
    })
});



// ------------------ checking phone number exist or not ---------------------
async function checkPhoneNumberExist(req) {
    let result = await RegisterNumber.find({ "phoneNumber": req.body.phoneNumber, "countryCode": req.body.countryCode });
    return (result);
}

// ------------------ register a new number ---------------------
async function newNumberRegister(req) {
    var now = new Date();
    var newRegister = new RegisterNumber({
        phoneNumber: req.body.phoneNumber,
        countryCode: req.body.countryCode,
        otpVerified: false,
        password: null
    });

    let result = await newRegister.save();
    return (result);
}



// ----------------------- update by id --------------------------------------
router.put('/registerNumber', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    RegisterNumber.find({ userId: req.body.userId }, function (err, result) {
        if (err) {
            res.json(err);
        }
        result[0].otpVerified = req.body.otpVerified ? req.body.otpVerified : false;
        result[0].password = req.body.password ? req.body.password : null;
        result[0].save((err, data) => {
            if (err) {
                res.json({ code: 500, msg: err });
            }
            else {
                res.json({ code: 200, msg: 'success' });
            }
        });
    });
});

// ----------------------- forgot password --------------------------------------
router.post('/forgotPassword', (req, res, next) => {
    checkPhoneNumberExist(req).then(data => {
        data[0].markModified('password');
        data[0].password = req.password;
        data[0].save((err, result) => {
            if (err) {
                res.json({ code: 500, msg: err });
            }
            var payload = { id: data[0]._id };
            var token = jwt.sign(payload, jwtOptions.secretOrKey);
            res.json({ code: 200, token: token, userId: data[0]._id });
        });
    })
});



module.exports = router;


