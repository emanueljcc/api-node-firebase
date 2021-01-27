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
router.get("/:id", isAuthenticated, find);
router.post("/", isAuthenticated, validator.add, add);
router.put("/:id", isAuthenticated, validator.id, edit);
router.delete("/:id", isAuthenticated, validator.id, remove);

module.exports = router;
