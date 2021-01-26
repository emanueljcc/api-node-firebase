const { Router } = require("express");

const AuthRoutes = require("./AuthRoutes");
const UserRoutes = require("./UserRoutes");

const router = Router();

/*
 * Auth
 */
router.use("/auth", AuthRoutes);

/*
 * Users
 */
router.use("/users", UserRoutes);

module.exports = router;
