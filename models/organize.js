const mongoose = require('mongoose');

const organizeSchema = mongoose.Schema({

    organizerId: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    stadiumId: {
        type: String,
        required: true
    },
    requestedUsers: [
        {
            userId: String,
            accept: false
        }
    ],
    publicRequest: {
        type: Boolean,
        required: true
    }

});

const organize = module.exports = mongoose.model('organize', organizeSchema);