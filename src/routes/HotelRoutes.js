const { Router } = require("express");
const router = Router();
const {
    getHotels,
    findHotel,
    createHotel,
} = require("../controllers/HotelController");

const { isAuthenticated, AdminAuth } = require("../middleware/auth-middleware");

// crud
router.get("/", [isAuthenticated, AdminAuth], getHotels);
router.get("/:id", [isAuthenticated, AdminAuth], findHotel);
router.post("/", [isAuthenticated, AdminAuth], createHotel);

module.exports = router;
