const router = require('express').Router();
const db = require('../models');


router.post('/login', (req,res) => {
	res.send('STUB - auth/login POST');
})

router.post('/signup', (req, res) => {
	db.User.find({
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

		})
		.catch(err => {
			console.log("ERROR creating new user record", err);
		})
	})
	.catch(err => {
		console.log('ERROR: existing user found in signup POST', err);
	})
//	res.send('STUB - auth/signup POST');
})

// NB: User must be logged in to get to this route
router.get('/current/user', (req,res) => {
	res.send('STUB - auth/current/user GET');
})


module.exports = router;