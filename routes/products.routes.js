const Router = require("express");

const productsController = require("../controllers/products.controller");

const router = new Router();

router.get("/", productsController.getProducts);

router.post("/", productsController.addProducts);

module.exports = router;
