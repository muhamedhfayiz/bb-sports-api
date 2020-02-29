const mongoose = require('mongoose');

const organizeSchema = mongoose.Schema({

    organizerId: {
        type: String,
        required: true
    },
    eventName: {
        type: String,
        required: true
    },
    eventDate: {
        type: String,
        required: true
    },
    eventStartTime: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    eventEndTime: {
        type: String,
        required: true
    },
    stadiumId: {
        type: String,
        required: true
    },
    acceptedUser: [
        {
            userId: String,
            accept: false
        }
    ],
    type: {
        type: String,
        required: true
    }

});

const organize = module.exports = mongoose.model('organize', organizeSchema);
