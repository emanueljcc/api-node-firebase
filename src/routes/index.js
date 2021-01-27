const { Router } = require("express");

const AuthRoutes = require("./AuthRoutes");
const RoomRoutes = require("./RoomRoutes");
const HotelRoutes = require("./HotelRoutes");

const router = Router();

/*
 * Auth
 */
router.use("/auth", AuthRoutes);

/*
 * Users
 */
router.use("/rooms", RoomRoutes);

/*
 * Hotels
 */
router.use("/hotels", HotelRoutes);

module.exports = router;
