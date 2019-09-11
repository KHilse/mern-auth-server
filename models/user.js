const mongoose = require('mongoose');
const bCrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
	firstname: {
		type: String,
		required: true,
		minlength: 2
	},
	lastname: String,
	email: {
		type: String,
		required: true,
		unique: true,
		minlength: 5,
		validate: {
			validator: (input) => {
				return /?*@?*\..*/.test(input)
			}
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		maxlength: 32
	}
})

// Use BCrypt to hash a password
userSchema.pre('save', function(next) {
	this.password = bcrypt.hashSync(this.password, 12);
	next();
})

// Write helper function to compare the password hashes
userSchema.set('toJSON', {
	transform: (doc, user) => {
		delete user.password;
		return user
	}
})

// Make sure the password doesn't get sent with the rest of the data

module.exports = mongoose.model('User', userSchema);