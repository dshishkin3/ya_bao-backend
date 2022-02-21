const Router = require("express");

const cartController = require("../controllers/cart.controller");
const authMiddleware = require("../middleware/auth.middleware");

const router = new Router();

router.get("/", authMiddleware, cartController.getProducts);

router.post("/", authMiddleware, cartController.addProduct);

router.delete("/", authMiddleware, cartController.deleteProduct);

router.put("/", authMiddleware, cartController.changeCount);

module.exports = router;
