const mongoose = require('mongoose');

const registerSchema = mongoose.Schema({

	role: {
		type: String,
		required: true
	},
	profilePic: {
		type: String,
		required: false
	},
	phoneNumber: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},

	password: {
		type: String,
		required: true
	},
	otpVerified: {
		type: Boolean,
		required: true
	}

});

const register = module.exports = mongoose.model('register', registerSchema);