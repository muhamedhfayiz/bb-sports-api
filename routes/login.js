const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Register = require('../models/register.js');

//---------------------- login---------------------------------------------
router.post('/login', (req, res) => {
    login(req).then(data => {
        if (data.length !== 0) {
            if (bcrypt.compareSync(req.body.password, data[0].password)) {
                data[0].password = null;
                res.json({ code: 200, msg: "login succesfull", data: data[0] });
            } else {
                res.json({ code: 302, msg: "password not matching" });
            }
        } else {
            res.json({ code: 301, msg: "phone number not registered" });
        }
    }).catch((err) => {
        res.json(err);
    });
});

async function login(req) {
    let data = Register.find({ phoneNumber: req.body.phoneNumber });
    return data;
}



module.exports = router;