const { Router } = require("express");
const router = Router();
const { createUser, login } = require("../controllers/AuthController");

// TODO: AGREGAR VALIDATORS
// register and login
router.post("/user-create", createUser);
router.post("/login", login);

module.exports = router;
