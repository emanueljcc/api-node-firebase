const { Router } = require("express");
const router = Router();
const {
    getAll,
    find,
    add,
    edit,
    remove,
} = require("../controllers/RoomController");
const validator = require("../utils/validator");

const { isAuthenticated, AdminAuth } = require("../middleware/auth-middleware");

// crud
router.get("/", getAll);
router.get("/:id", find);
router.post("/", add);
router.put("/:id", validator.id, edit);
router.delete("/:id", validator.id, remove);

module.exports = router;
