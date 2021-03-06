const { db, firebase } = require("../database");
const { validationResult } = require("express-validator");

// TODO: AGREGAR EXPRESS validator

createUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        const { email, password, firstName, lastName, role } = req.body;

        const user = await db.auth().createUser({
            email,
            password,
            displayName: `${firstName} ${lastName}`,
        });

        await db.database().ref("roles").push({
            userId: user.uid,
            role,
        });

        res.status(200).json({ data: user, message: "Create user OK" });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

login = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    };

    firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((data) => {
            return data.user.getIdToken();
        })
        .then((token) => {
            res.status(200).json({
                message: "Successful login.",
                token: `Bearer ${token}`,
            });
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
            return res.status(500).json({ message: err.message });
        });
};

module.exports = {
    createUser,
    login,
};
