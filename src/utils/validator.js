const { check } = require("express-validator");

// USERS
const add = [
    check("email").exists().isEmail().withMessage("email is required"),
    check("password")
        .exists()
        .isLength({ min: 5 })
        .withMessage("password is required"),
    check("firstName").exists().withMessage("firstName is required"),
    check("lastName").exists().withMessage("lastName is required"),
];

const id = [
    check("id").exists().withMessage("Invalid value: it must be alphanumeric."),
];

module.exports = {
    add,
    id,
};
