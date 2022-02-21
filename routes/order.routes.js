const Router = require("express");
const authMiddleware = require("../middleware/auth.middleware");

const orderController = require("../controllers/order.controller");

const router = new Router();

router.post("/", authMiddleware, orderController.addOrder);

module.exports = router;
