const User = require("../models/User");
const bcrypt = require("bcrypt");

class userController {
  async update(req, res) {
    console.log(req.body);
    try {
      if (req.body.form.password) {
        try {
          req.body.form.password = await bcrypt.hash(req.body.form.password, 8);
        } catch (error) {
          return res.status(500).json(error);
        }
      }
      await User.findByIdAndUpdate(req.user._id, {
        $set: req.body.form,
      });
      res.status(200).json({ message: "Данные обновлены!" });
    } catch (error) {
      res.status(500).json({ error: "server error" });
      console.log(error);
    }
  }
}

module.exports = new userController();
