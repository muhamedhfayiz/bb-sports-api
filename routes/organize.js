
const express = require('express');
const router = express.Router();
const Organize = require('../models/organize');



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
        description: req.body.description,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        stadiumId: req.body.stadiumId,
        requestedUsers: req.body.requestedUsers,
        publicRequest: req.body.publicRequest
    });

    let saved = await newOrganize.save();
    return (saved);
}


//----------------------  get facility ---------------------------------------------
router.get('/organize', (req, res) => {
    Organize.find(function (err, data) {
        res.json(data);
    });
});

module.exports = router;

