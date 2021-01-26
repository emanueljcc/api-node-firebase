const db = require('../db');
const { validationResult } = require('express-validator');

getAll = async (req, res) => {
	try {
		db.ref('contacts').once('value', snapshot => {
			const data = snapshot.val();

			res.status(200).json({
				data,
				message: 'OK'
			});
		});
	} catch (error) {
		res.status(500).json({
			message: error
		});
	}
};

add = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	try {
		const { firstName, lastName, email } = req.body;
		const newContact = {
			firstName,
			lastName,
			email
		};
		const data = db.ref('contacts').push(newContact);
		res.status(200).json({
			data,
			message: 'OK'
		});
	} catch (error) {
		res.status(500).json({
			message: error
		});
	}
};

remove = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	try {
		const { id } = req.params;
		db.ref(`contacts/${id}`).remove();

		res.status(200).json({
			message: 'Remove OK'
		});
	} catch (error) {
		res.status(500).json({
			message: error
		});
	}
};

module.exports = {
	getAll,
	add,
	remove
};
