
const express = require('express');
const router = express.Router();
const Organize = require('../models/organize');
const Register = require('../models/register');


//---------------------- add facility ---------------------------------------------
router.post('/organize', (req, res) => {
    addOrganize(req).then(data => {
        res.json({ code: 200, msg: "added succesfully" });
    }).catch((err) => {
        res.json(err);
    });
});


async function addOrganize(req) {
    let newOrganize = new Organize({
        organizerId: req.body.organizerId,
        eventName: req.body.eventName,
        description: req.body.description,
        eventDate: req.body.eventDate,
        eventStartTime: req.body.eventStartTime,
        eventEndTime: req.body.eventEndTime,
        stadiumId: req.body.stadiumId,
        requestedUsers: req.body.requestedUsers,
        type: req.body.type
    });

    let saved = await newOrganize.save();
    return (saved);
}


//----------------------  get facility ---------------------------------------------
router.get('/organize', (req, res) => {
    getUser().then(data => {
        res.json(data);
    })
});

async function getUser() {
    let result = await Organize.find();
    for (let i = 0; i < result.length; i++) {
        result[i].user = await Register.find({ _id: result[i].organizerId });
    }
    return result;
}

module.exports = router;


