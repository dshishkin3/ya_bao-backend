const Router = require("express");

const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = new Router();

router.get("/", authMiddleware, authController.auth);

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
