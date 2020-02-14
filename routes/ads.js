const express = require('express');
const router = express.Router();
var passport = require("passport");
const Ads = require('../models/ads.js');
var GeoPoint = require('geopoint');


//----------------------retriving category data-----------------------------------
router.post('/get-nearby-ads', passport.authenticate('jwt', { session: false }), (req, res, next) => {

    var userLocation = new GeoPoint(req.body.startLat, req.body.startLon);

    let filter;
    if (req.body.countryCode === 0) {
        filter = {};
    } else {
        filter = { countryCode: req.body.countryCode }
    }
    Ads.find(filter, function (err, data) {
        if (err) {
            res.json(err);
        }
        if (data) {
            for (var i = 0; i < data.length; i++) {
                var destLocation = new GeoPoint(parseFloat(data[i].location.lat), parseFloat(data[i].location.lon));
                data[i].distance = userLocation.distanceTo(destLocation, true);
            }
        }

        data.sort(function (a, b) {
            var keyA = new Date(a.distance),
                keyB = new Date(b.distance);
            // Compare the 2 dates
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
        res.json(data);
    });
});

//---------------------- posting category data ---------------------------------------------
router.post('/ads', passport.authenticate('jwt', { session: false }), (req, res) => {
    newAd(req).then(data => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});


async function newAd(req) {
    var now = new Date();
    var newAd = new Ads({
        adsRole: req.body.adsRole,
        userId: req.body.userId,
        title: req.body.title,
        location: {
            lat: req.body.location.lat,
            lon: req.body.location.lon,
            place: req.body.location.place
        },
        mainCategory: {
            id: req.body.mainCategory.id,
            en: req.body.mainCategory.en,
            ar: req.body.mainCategory.ar,
        },
        workDescription: req.body.workDescription,
        view: 0,
        date: new Date(),
        countryCode: req.body.countryCode,
        featured: false
    });

    for (let i = 0; i < req.body.subCategory.length; i++) {
        newAd.subCategory.unshift(
            {
                id: req.body.subCategory[i].id,
                en: req.body.subCategory[i].en,
                ar: req.body.subCategory[i].ar,
            }
        )
    }

    let result = await newAd.save();
    return (result);
}

// -------------------------- get ads by userId -----------------------------------
router.post('/adsByUserId', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Ads.find({ userId: req.body.userId }, function (err, data) {
        if (err) {
            res.json(err);
        }
        res.json(data);
    });
});


// -------------------------- delete category ------------------------------------------------
router.delete('/ads/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    Ads.remove({ _id: req.params.id }, function (err, result) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    });
});


//  -------------------------- update category ----------------------------------------------
router.put('/ads/:id', (req, res, next) => {
    Ads.findById({ _id: req.params.id }, function (err, result) {
        if (err) {
            res.json(err);
        }
        result.title = req.body.title ? req.body.title : result.title;
        result.location.lat = req.body.location ? req.body.location.lat : result.location.lat;
        result.location.lon = req.body.location ? req.body.location.lon : result.location.lon;
        result.location.place = req.body.location ? req.body.location.place : result.location.place;
        result.mainCategory.id = req.body.mainCategory ? req.body.mainCategory.id : result.mainCategory.id;
        result.mainCategory.en = req.body.mainCategory ? req.body.mainCategory.en : result.mainCategory.en;
        result.mainCategory.ar = req.body.mainCategory ? req.body.mainCategory.ar : result.mainCategory.ar;
        result.workDescription = req.body.workDescription ? req.body.workDescription : result.workDescription;
        result.view = req.body.view ? req.body.view : result.view;

        if (req.body.subCategory) {
            for (let i = 0; i < req.body.subCategory.length; i++) {
                result.subCategory[i].id = req.body.subCategory[i].id ? req.body.subCategory[i].id : result.subCategory[i].id;
                result.subCategory[i].en = req.body.subCategory[i].en ? req.body.subCategory[i].en : result.subCategory[i].en;
                result.subCategory[i].ar = req.body.subCategory[i].ar ? req.body.subCategory[i].ar : result.subCategory[i].ar;
            }
        }
        result.save((err, result) => {
            if (err) {
                res.json(err + { msg: 'failed to add' });
            }
            else {
                res.json(result);
            }
        });
    });
});


module.exports = router;