const Router = require("express");
const userController = require("../controllers/user.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = new Router();

router.put("/", authMiddleware, userController.update);

module.exports = router;
