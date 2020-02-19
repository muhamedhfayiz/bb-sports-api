
const express = require('express');
const router = express.Router();
const Stadium = require('../models/stadium.js');



//---------------------- add facility ---------------------------------------------
router.post('/stadium', (req, res) => {
    addStadium(req).then(data => {
        res.json({ code: 200, msg: "added succesfully" });
    }).catch((err) => {
        res.json(err);
    });
});


async function addStadium(req) {

    let newStadium = new Stadium({
        stadiumName: req.body.stadiumName,
        stadiumDescription: req.body.stadiumDescription,
        // openTime: req.body.openTime,
        // closeTime: req.body.closeTime,
        // amount: req.body.amount,
        // createdDate: new Date.now(),
        createdBy: req.body.createdBy,
        location: req.body.location
    });


    // for (let i = 0; i < req.body.facilities.length; i++) {
    //     newStadium.facilities.push(req.body.facilities[i]);
    // }

    let saved = await newStadium.save();

    return (saved);
}


//----------------------  get facility ---------------------------------------------
router.get('/stadium', (req, res) => {
    Stadium.find(function (err, data) {
        res.json(data);
    });
});

module.exports = router;