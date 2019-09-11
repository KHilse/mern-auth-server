// IMPORTS
const cors = require('cors');
const express = require('express');
const morgan = require('morgan');


// Instantiate app
const app = express();

// MIDDLEWARE
app.use(cors());
app.use(morgan('[development]'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '10mb' }));

// CONTROLLERS


// GLOBAL ROUTES
app.get('*', (req, res) => {
	res.status(404).send('Didn\'t find anything here');
})


app.listen(process.env.PORT || 8000);