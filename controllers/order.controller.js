const Order = require("../models/Order");
const User = require("../models/User");

class orderController {
  async addOrder(req, res) {
    try {
      const { info, amount, products } = req.body;

      const user = await User.findById(req.user._id);

      await user.updateOne({
        $push: {
          orders: {
            ...info,
            amount,
            products: products,
          },
        },
      });

      await Order.create({
        ...info,
        products: products,
        amount,
      });

      await user.updateOne(
        { $set: { cart: [], amountCart: 0 } },
        { multi: true }
      );

      res.status(200).json({ message: "Товар успешно добавлен в корзину!" });
    } catch (error) {
      res.status(500).json({ error: "server error" });
      console.log(error);
    }
  }
}

module.exports = new orderController();
