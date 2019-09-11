const router = require('express').Router();
const db = require('../models');


router.post('/login', (req,res) => {
	res.send('STUB - auth/login POST');
})

router.post('/signup', (req, res) => {
	res.send('STUB - auth/signup POST');
})

// NB: User must be logged in to get to this route
router.get('/current/user', (req,res) => {
	res.send('STUB - auth/current/user GET');
})


module.exports = router;