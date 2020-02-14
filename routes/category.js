const express = require('express');
const router = express.Router();
var passport = require("passport");
const Category = require('../models/category');
const SubCategory = require('../models/subCategory');

//----------------------retriving category data-----------------------------------
router.get('/category', passport.authenticate('jwt', { session: false }), (req, res, next) => {
        Category.find(function (err, data) {
                res.json(data);
        });
});

//---------------------- posting category data ---------------------------------------------
router.post('/category', (req, res, next) => {
        if (req.body.admin === 'fayiz' && req.body.password === 'Pinboard1$') {
                newCategory(req).then(data => {
                        res.json(data);
                }).catch((err)=>{
                        res.send(err);
                })
        } else {
                res.json('auth error, Admin can only add category');
        }
});
async function newCategory(req) {
        var now = new Date();
        var newCategory = new Category({
                categoryName: {
                        en: req.body.categoryName.en,
                        ar: req.body.categoryName.ar,
                },
                categoryIcon: req.body.categoryIcon
        });

        let result = await newCategory.save();
        return (result);
}

// -------------------------- delete category ------------------------------------------------
router.delete('/category/:id', passport.authenticate('jwt', { session: false }), (req, res, next) => {
        Category.remove({ _id: req.params.id }, function (err, result) {
                if (err) {
                        res.json(err);
                }
                else {
                        res.json(res);
                }
        });
});

//  -------------------------- update category ----------------------------------------------
router.put('/category/:id', (req, res, next) => {
        Category.findById({ _id: req.params.id }, function (err, result) {
                if (err) {
                        res.json(err);
                }
                result.categoryName.ar = req.body.categoryName.ar ? req.body.categoryName.ar : result.categoryName.ar,
                        result.categoryName.en = req.body.categoryName.en ? req.body.categoryName.en : result.categoryName.en,
                        result.categoryIcon = req.body.categoryIcon ? req.body.categoryIcon : result.categoryIcon;
                result.important = req.body.important ? req.body.important : result.important;


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


//---------------------- searching category data ---------------------------------------------
router.post('/search-categories', passport.authenticate('jwt', { session: false }), (req, res, next) => {
        searchMainCategory(req.body.query).then(data => {
                res.json(data);
        }).catch((err)=>{
                res.json(err);
        });

});

//---------------------- searching subcategory data ---------------------------------------------
router.post('/search-subcategories', passport.authenticate('jwt', { session: false }), (req, res, next) => {
        searchSubCategory(req.body.query).then(data => {
                var returnData = [];
                for (var i = 0; i < data.length; i++) {
                        let subcate = data[i].subCategoryName;
                        searchResult = subcate.filter(function (item) {
                                return (item.en.toLowerCase().indexOf(req.body.query.toLowerCase()) > -1);
                        });
                        returnData.push({ categoryId: data[i].categoryId, subcategory: searchResult })
                }
                res.json(returnData);
        }).catch((err)=>{
                res.send(err);
        })

});

//search by main category
async function searchMainCategory(query) {
        let cate = Category.find({ 'categoryName.en': new RegExp(query, 'i') } || { 'categoryName.ar': new RegExp(query, 'i') });
        return cate;
}


//search by sub category
async function searchSubCategory(query) {
        let subcate = SubCategory.find({ 'subCategoryName.en': new RegExp(query, 'i') } || { 'subCategoryName.ar': new RegExp(query, 'i') });
        return subcate;
}


module.exports = router;