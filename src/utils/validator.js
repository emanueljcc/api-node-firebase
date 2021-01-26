const { check } = require('express-validator');

// USERS
const add = [
	check('firstName').exists().withMessage('firstName is required'),
	check('lastName').exists().withMessage('lastName is required'),
	check('email').isEmail()
];

const id = [
	check('id').exists().withMessage('Invalid value: it must be alphanumeric.')
];

module.exports = {
	add,
	id
};
