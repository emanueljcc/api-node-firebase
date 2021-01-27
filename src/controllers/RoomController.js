const { db } = require("../database");
const { validationResult } = require("express-validator");

getAll = async (req, res) => {
    try {
        await db
            .database()
            .ref("rooms")
            .once("value", (snapshot) => {
                const data = snapshot.val();

                res.status(200).json({
                    data,
                    message: "Successfully obtained by all rooms.",
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
        const rooms = db.database().ref("rooms");
        const room = rooms.child(id);
        room.once("value", function (snap) {
            res.status(200).json({ data: snap.val(), message: "Success." });
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
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
        const room = {
            firstName,
            lastName,
            email,
        };
        await db.database().ref("rooms").push(room);
        res.status(200).json({
            data: room,
            message: "Room created successfully.",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
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
        const room = {
            id,
            firstName,
            lastName,
            email,
        };
        db.database().ref(`rooms/${id}`).update(room);

        res.status(200).json({
            data: room,
            message: "Room edited successfully.",
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
        await db.database().ref(`rooms/${id}`).remove();

        res.status(200).json({
            message: "Room deleted successfully.",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
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
