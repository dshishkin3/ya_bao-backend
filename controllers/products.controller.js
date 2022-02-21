const Product = require("../models/Product");

class productController {
  async getProducts(req, res) {
    try {
      const products = await Product.find();

      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: "server error" });
      console.log(error);
    }
  }

  async addProducts(req, res) {
    try {
      const product = await Product.create({
        ...req.body,
      });

      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ error: "server error" });
      console.log(error);
    }
  }
}

module.exports = new productController();
