
const mongoose = require('mongoose');

const stadiumSchema = mongoose.Schema({

    stadiumName: {
        type: String,
        required: true
    },
    stadiumDescription: {
        type: String
    },
    location: {
        type: String
    },
    openTime: {
        type: String
    },
    closeTime: {
        type: String
    },

    amount: {
        type: String
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

});

const stadium = module.exports = mongoose.model('stadium', stadiumSchema);