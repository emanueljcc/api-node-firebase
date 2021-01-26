const { Router } = require("express");
const router = Router();
const {
    login,
    createUser,
    getAll,
    find,
    add,
    edit,
    remove,
} = require("../controllers/UserControllers");
const validator = require("../utils/validator");

const { checkIfAuthenticated } = require("../middleware/auth-middleware");

// crud
router.get("/user", checkIfAuthenticated, getAll);
router.get("/user/:id", find);
router.post("/user", validator.add, add);
router.put("/user/:id", validator.id, edit);
router.delete("/user/:id", validator.id, remove);

// register and login
router.post("/user-create", createUser);
router.post("/login", login);

module.exports = router;
