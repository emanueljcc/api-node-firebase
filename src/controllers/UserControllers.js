const { db } = require("../database");
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
                    message: "Successfully obtained by all users.",
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
            res.status(200).json({ data: snap.val(), message: "Success." });
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
            message: "User created successfully.",
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
            message: "User edited successfully.",
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
            message: "User deleted successfully.",
        });
    } catch (error) {
        res.status(500).json({
            message: error,
        });
    }
};

module.exports = {
    getAll,
    find,
    add,
    edit,
    remove,
};
