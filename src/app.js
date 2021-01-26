const express = require('express');
const morgan = require('morgan');
var bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// middlewares
app.use(morgan('dev'));
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.use(bodyParser.json());

// routes
app.use('/api', require('./routes'));

module.exports = app;
