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
	otpVerified: {
		type: Boolean,
		required: false
	},
	favoriteClub: {
		type: String,
		required: true
	},
	favoriteTeam: {
		type: String,
		required: true
	},
	age: {
		type: String,
		required: true
	},
	position: {
		type: String,
		required: true
	},
	favorites: []

});

const register = module.exports = mongoose.model('register', registerSchema);