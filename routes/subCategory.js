const express = require('express');
const router = express.Router();
var passport = require("passport");
const SubCategory = require('../models/subCategory');
const Register = require('../models/register.js');

//----------------------retriving category data-----------------------------------
router.get('/subcategory', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    SubCategory.find(function (err, data) {
        res.json(data);
    });
});

//---------------------- posting category data ---------------------------------------------
router.post('/subcategory', (req, res, next) => {
    if (req.body.admin === 'fayiz' && req.body.password === 'Pinboard1$') {
        SubCategory.find({ "categoryId": req.body.categoryId }, function (err, result) {
            if (err) {
                res.json(err);
            } else {
                if (result.length === 0) {
                    newSubCategory(req).then(data => {
                        res.json(data);
                    });
                } else {
                    pushToSubcategory(result, req).then(data => {
                        res.json(data);
                    }).catch((err) => {
                        res.send(err);
                    });
                }
            }
        });
    } else {
        res.json('auth error, Admin can only add category');
    }
});

async function newSubCategory(req) {
    var now = new Date();
    var newSubCategory = new SubCategory({
        categoryId: req.body.categoryId,
        subCategoryName: [{
            en: req.body.subCategoryName[0].en,
            ar: req.body.subCategoryName[0].ar,
            icon: req.body.subCategoryName[0].icon,
        }]
    });

    let result = await newSubCategory.save();
    return (result);
}

async function pushToSubcategory(result, req) {
    result[0].subCategoryName.unshift({ en: req.body.subCategoryName[0].en, ar: req.body.subCategoryName[0].ar, icon: req.body.subCategoryName[0].icon });
    let results = await result[0].save();
    return (results);
}

// -------------------------- delete category ------------------------------------------------
router.delete('/subcategory/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    SubCategory.remove({ _id: req.params.id }, function (err, result) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    });
});

//  -------------------------- update category ----------------------------------------------
router.put('/subcategory/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    SubCategory.findById({ _id: req.params.id }, function (err, result) {
        if (err) {
            res.json(err);
        }
        result.subCategoryName.ar = req.body.subCategoryName.ar ? req.body.subCategoryName.ar : result.subCategoryName.ar;
        result.subCategoryName.en = req.body.subCategoryName.en ? req.body.subCategoryName.en : result.subCategoryName.en;
        result.subCategoryIcon = req.body.subCategoryIcon ? req.body.subCategoryIcon : result.subCategoryIcon;
        result.save((err, category) => {
            if (err) {
                res.json(err + { msg: 'failed to add' });
            }
            else {
                res.json(category);
            }
        });
    });
});


//  -------------------------- sub category by id----------------------------------------------
router.get('/subcategoryByCatId/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    SubCategory.find({ "categoryId": req.params.id }, function (err, result) {
        if (err) {
            res.json(err);
        }
        res.json(result);
    });
});



module.exports = router;