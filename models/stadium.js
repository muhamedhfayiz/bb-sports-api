
const mongoose = require('mongoose');

const stadiumSchema = mongoose.Schema({

    stadiumName: {
        type: String,
        required: true
    },
    stadiumDescription: {
        type: String
    },
    facilities: [],
    location: {
        place: String,
        lat: Number,
        lng: Number
    },
    openTime: {
        type: String,
        required: true
    },
    closeTime: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    createdDate: {
        type: Date,
    },
    updatedDate: {
        type: Date,
    },
    createdBy: {
        type: String,
    },
    updatedBy: {
        type: String,
    },
    distance: {}

});

const stadium = module.exports = mongoose.model('stadium', stadiumSchema);