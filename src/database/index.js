const admin = require("firebase-admin");
const config = require("../utils/config-firebase");
const firebase = require("firebase");

// firebase admin
const servicesAccount = require("../../config/credentials.json");
admin.initializeApp({
    credential: admin.credential.cert(servicesAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
});
const db = admin;

// firebase
firebase.initializeApp(config);

module.exports = {
    db,
    firebase,
};
