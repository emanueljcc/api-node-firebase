const { db } = require("../database");
const { validationResult } = require("express-validator");

getHotels = async (req, res) => {
    try {
        await db
            .database()
            .ref("hotels")
            .once("value", (snapshot) => {
                const data = snapshot.val();

                res.status(200).json({
                    data,
                    message: "Successfully obtained by all hotels.",
                });
            });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

findHotel = async (req, res) => {
    try {
        const { id } = req.params;
        const hotels = db.database().ref("hotels");
        const hotel = hotels.child(id);
        hotel.once("value", function (snap) {
            res.status(200).json({ data: snap.val(), message: "Success." });
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

createHotel = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        const { name } = req.body;
        const hotel = {
            name,
        };
        await db.database().ref("hotels").push(hotel);

        res.status(200).json({
            data: hotel,
            message: "Hotel created successfully.",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    getHotels,
    findHotel,
    createHotel,
};
