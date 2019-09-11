require('dotenv').config();
const router = require('express').Router();
const db = require('../models');
const jwt = require('jsonwebtoken');

router.post('/login', (req,res) => {
	res.send('STUB - auth/login POST');
})

router.post('/signup', (req, res) => {
	db.User.findOne({
		email: req.body.email
	})
	.then(user => {
		// if user exists, don't let them set up a dupe account
		if (user) {
			return res.status(409).send('Email address already in use on this site');
		}

		// User doesn't exist, so create the db entry
		db.User.create(req.body)
		.then(newUser => {
			// Assign a token to the new user
			let token = jwt.sign(newUser.toJSON(), process.env.JWT_SECRET, {
				expiresIn: 60 * 60 * 12 // Units in seconds
			});
			res.send({token});
		})
		.catch(err => {
			console.log("ERROR creating new user record", err);
			res.status(500).send('Couldn\'t create a new user record');
		})
	})
	.catch(err => {
		console.log('ERROR: existing user found in signup POST', err);
		res.status(503).send('Something went wrong with the db');
	})
//	res.send('STUB - auth/signup POST');
})

// NB: User must be logged in to get to this route
router.get('/current/user', (req,res) => {
	res.send('STUB - auth/current/user GET');
})


module.exports = router;