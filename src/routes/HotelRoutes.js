const { Router } = require("express");
const router = Router();
const {
    getHotels,
    findHotel,
    createHotel,
} = require("../controllers/HotelController");

const { isAuthenticated, AdminAuth } = require("../middleware/auth-middleware");

// crud
// [isAuthenticated, AdminAuth]

router.get("/", getHotels);
router.get("/:id", findHotel);
router.post("/", createHotel);

module.exports = router;
