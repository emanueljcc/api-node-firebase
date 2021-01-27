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
router.get("/", [isAuthenticated, AdminAuth], getAll);
router.get("/:id", [isAuthenticated, AdminAuth], find);
router.post("/", [isAuthenticated, AdminAuth], add);
router.put("/:id", [isAuthenticated, AdminAuth], validator.id, edit);
router.delete("/:id", [isAuthenticated, AdminAuth], validator.id, remove);

module.exports = router;
