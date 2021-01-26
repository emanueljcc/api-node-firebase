const admin = require("firebase-admin");
const config = require("./utils/config");
const firebase = require("firebase");

// firebase admin
const servicesAccount = require("../config/nodeapifirebasehotels-firebase-adminsdk-s7jih-b4ae1f7cf3.json");
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
