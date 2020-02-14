const express = require('express');
const router = express.Router();
var passport = require("passport");
const Ads = require('../models/ads');
const FeaturedAds = require('../models/featuredAds');
const Register = require('../models/register.js');
var cron = require('node-cron');



//---------------------- Removing FeaturedAds when expire -----------------------------------
cron.schedule('00 12 * * *', () => {
    deleteFeaturedAdByTime().then(data => {
        for (var i = 0; i < data.length; i++) {
            let currentDate = new Date();
            const diffTime = Math.abs(currentDate - new Date(data[i].createdDate));
            let hours = (diffTime / (1000 * 60 * 60)) % 24;
            if (hours >= 1) {
                FeaturedAds.remove({ _id: data[i]._id }, function (err, result) { });
                changeFeaturedLabel(data[i].adId);
            }
        }
    }).catch((err)=>{
        res.send(err);
    })
}, {
        scheduled: true
    });


async function deleteFeaturedAdByTime() {
    let featuredAds = FeaturedAds.find();
    return featuredAds;
}

function changeFeaturedLabel(adId) {
    Ads.find({ _id: adId }, function (err, data) {
        data[0].featured = false;
        data[0].save();
    });
}

//----------------------retriving FeaturedAds data-----------------------------------
router.get('/featuredAds', passport.authenticate('jwt', { session: false }), (req, res, next) => {

    let skip = req.body.skip;
    let limit = req.body.limit;
    let index = 0;

    FeaturedAds.find({ skip: skip, limit: limit }, function (_err, data) {
        let returnData = [];
        if (data.length !== 0) {
            for (var key in data) {
                getAdsById(data[key].adId).then(adsRes => {
                    returnData.push(adsRes[0]);
                    Register.find({ "userId": adsRes[0].userId }, function (err, userInfo) {
                        returnData[index].set('userInfo', userInfo[0], { strict: false })
                        ++index;
                        if (index === data.length) {
                            res.json(returnData);
                            console.log(returnData)
                        }
                    });
                }).catch((err)=>{
                    res.send(err);
                })
            }
        } else {
            res.json(data);
        }
    });
});



//---------------------- posting FeaturedAds  ---------------------------------------------
router.post('/featuredAds', (req, res, next) => {
    newFeaturedAds(req).then(data => {
        getAdsById(req.body.adId).then(callback => {
            if (callback) {
                callback[0].featured = true;
                callback[0].save();
                res.json({ code: 200, msg: 'marked as featured' });
            }
        }).catch((err) => {
            res.send(err);
        })
    }).catch((err) => {
        res.send(err);
    })
});

async function getAdsById(adId) {
    let ads = Ads.find({ _id: adId });
    return ads;
}

async function newFeaturedAds(req) {
    var date = new Date();
    var newFeaturedAds = new FeaturedAds({
        adId: req.body.adId,
        userId: req.body.userId,
        createdDate: new Date()
    });
    let result = await newFeaturedAds.save();
    return (result);
}




module.exports = router;