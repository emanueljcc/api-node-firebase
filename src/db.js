const admin = require('firebase-admin');
const servicesAccount = require('../config/nodeapifirebasehotels-firebase-adminsdk-s7jih-b4ae1f7cf3.json');
admin.initializeApp({
	credential: admin.credential.cert(servicesAccount),
	databaseURL: process.env.DATABASE_URL
});

const db = admin.database();

module.exports = db;
