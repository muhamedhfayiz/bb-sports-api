const mongoose = require('mongoose');

const featuredAdsSchema = mongoose.Schema({
    adId: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
});

const featuredAds = module.exports = mongoose.model('featuredAds', featuredAdsSchema);