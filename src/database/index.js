const admin = require("firebase-admin");
const config = require("../utils/config-firebase");
const firebase = require("firebase");
const auth = require("firebase/auth");

// firebase admin
const servicesAccount = require("../../config/credentials.json");
admin.initializeApp({
    credential: admin.credential.cert(servicesAccount),
    // databaseURL: process.env.FIREBASE_DATABASE_URL,
});
const db = admin.firestore();

// firebase
firebase.initializeApp(config);

console.log(firebase.auth().currentUser);

module.exports = {
    db,
    firebase,
    auth,
};
