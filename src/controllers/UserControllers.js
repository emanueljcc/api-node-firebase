const { db, firebase } = require("../db");
const { validationResult } = require("express-validator");

getAll = async (req, res) => {
    try {
        await db
            .database()
            .ref("users")
            .once("value", (snapshot) => {
                const data = snapshot.val();

                res.status(200).json({
                    data,
                    message: "All OK",
                });
            });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

find = async (req, res) => {
    try {
        const { id } = req.params;
        const users = db.database().ref("users");
        const user = users.child(id);
        user.once("value", function (snap) {
            res.status(200).json({ data: snap.val(), message: "One OK" });
        });
    } catch (error) {
        res.status(500).json({
            message: error,
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
        const user = {
            firstName,
            lastName,
            email,
        };
        await db.database().ref("users").push(user);
        res.status(200).json({
            data: user,
            message: "Create OK",
        });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};

edit = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        const { id } = req.params;
        const { firstName, lastName, email } = req.body;
        const user = {
            id,
            firstName,
            lastName,
            email,
        };
        db.database().ref(`users/${id}`).update(user);

        res.status(200).json({
            data: user,
            message: "Update OK",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
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
        await db.database().ref(`users/${id}`).remove();

        res.status(200).json({
            message: "Remove OK",
        });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};

createUser = async (req, res) => {
    try {
        const {
            email,
            phoneNumber,
            password,
            firstName,
            lastName,
            photoUrl,
        } = req.body;

        const user = await db.auth().createUser({
            email,
            phoneNumber,
            password,
            displayName: `${firstName} ${lastName}`,
            photoURL: photoUrl,
        });

        res.status(200).json({ data: user, message: "Create user OK" });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};

validateLoginData = (data) => {
    let errors = {};
    if (isEmpty(data.email)) {
        errors.email = "Email filed is required!";
    } else if (isEmpty(data.password)) {
        errors.password = "Password filed is required!";
    } else if (!isEmail(data.email)) {
        errors.email = "Must be valid email address";
    }
    return {
        errors,
        valid: Object.keys(errors).length === 0 ? true : false,
    };
};

login = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    };

    // const { valid, errors } = validateLoginData(user);
    // if (!valid) return res.status(400).json(errors);
    firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password) //firebase signin method
        .then((data) => {
            console.log(JSON.stringify(data));
            return data.user.getIdToken();
        })
        .then((token) => {
            return res.json({ token });
        })
        .catch((err) => {
            if (
                err.code == "auth/wrong-password" ||
                err.code == "auth/user-not-found"
            ) {
                return res
                    .status(403)
                    .json({ message: "Wrong credentials, Please try again" });
            }
            return res.status(500).json({ error: err.code });
        });
};

module.exports = {
    login,
    createUser,
    getAll,
    find,
    add,
    edit,
    remove,
};
