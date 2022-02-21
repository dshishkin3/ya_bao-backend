const User = require("../models/User");

class cartController {
  async getProducts(req, res) {
    try {
      const products = await User.findById(req.user._id);

      res
        .status(200)
        .json({ products: products.cart, amountCart: products.amountCart });
    } catch (error) {
      res.status(500).json({ error: "server error" });
      console.log(error);
    }
  }

  async addProduct(req, res) {
    try {
      const {
        _id,
        title,
        subtitle,
        urlImg,
        count,
        price,
        category,
        size,
        extension,
        type,
      } = req.body;

      const user = await User.findById(req.user._id);

      await user.updateOne({
        $push: {
          cart: {
            _id,
            title,
            subtitle,
            urlImg,
            count,
            price: price * count,
            category,
            size,
            extension,
            type,
          },
        },
      });
      await user.updateOne({ $inc: { amountCart: price * count } });

      res.status(200).json({ message: "Товар успешно добавлен в корзину!" });
    } catch (error) {
      res.status(500).json({ error: "server error" });
      console.log(error);
    }
  }

  async deleteProduct(req, res) {
    try {
      const { _id } = req.body;

      const user = await User.findOne({ _id: req.user._id });

      const currProduct = await user.cart.filter(
        (product) => product._id === _id
      );

      const filteredProducts = await user.cart.filter(
        (product) => product._id !== _id
      );

      await user.updateOne({
        cart: filteredProducts,
        $inc: { amountCart: -currProduct[0].price },
      });

      res.status(200).json({ message: "Товар удалён из вашей корзины!" });
    } catch (error) {
      res.status(500).json({ error: "server error" });
      console.log(error);
    }
  }

  async changeCount(req, res) {
    try {
      const { _id, operation } = req.body;

      const user = await User.findOne({ _id: req.user._id });

      const currProduct = await user.cart.filter(
        (product) => product._id === _id
      );

      if (operation === "increment") {
        await User.updateOne(
          { _id: req.user._id, "cart._id": _id },
          { $inc: { "cart.$.count": 1, amountCart: currProduct[0].price } }
        );
      } else {
        await User.updateOne(
          { _id: req.user._id, "cart._id": _id },
          { $inc: { "cart.$.count": -1, amountCart: -currProduct[0].price } }
        );
      }

      res.status(200).json({ message: "Кол-во товара изменено" });
    } catch (error) {
      res.status(500).json({ error: "server error" });
      console.log(error);
    }
  }
}

module.exports = new cartController();
