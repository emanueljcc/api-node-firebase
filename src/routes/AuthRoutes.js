const { Router } = require("express");
const router = Router();
const { createUser, login } = require("../controllers/AuthController");
const validator = require("../utils/validator");

// TODO: AGREGAR VALIDATORS
// register and login
router.post("/user-create", validator.add, createUser);
router.post("/login", login);

module.exports = router;
