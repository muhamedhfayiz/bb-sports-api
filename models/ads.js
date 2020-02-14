const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({

    adsRole: {
        type: String,
        required: true
    },

    userId: {
        type: String,
        required: true
    },

    title: {
        type: String,
        required: true
    },

    location: {
        lat: {
            type: String,
            required: true
        },
        lon: {
            type: String,
            required: true
        },
        place:String
    },

    mainCategory: {
        id: String,
        en: String,
        ar: String
    },

    subCategory: [
        {
            id: String,
            en: String,
            ar: String
        }
    ],

    workDescription: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    view: {
        type: Number,
        required: false
    },

    distance: {
        type: Number,
        required: false
    },
    countryCode: {
        type: Number,
        required: false
    },
    featured: {
        type: Boolean,
        required: false
    }
});

const ads = module.exports = mongoose.model('ads', categorySchema);