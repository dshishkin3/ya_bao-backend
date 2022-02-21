const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

class authController {
  async register(req, res) {
    try {
      const { number, password } = req.body;
      const data = { number, password };

      // validate
      const { error } = Joi.object({
        number: Joi.string().required().min(12).max(12),
        password: Joi.string().required().min(6).max(20),
      }).validate(data);

      if (error) {
        return res.status(400).json({ errors: error.details });
      }

      // check exist user
      const existUser = await User.findOne({ number });

      if (existUser)
        return res
          .status(400)
          .json({ error: "Пользователь с таким номером уже зарегистрирован!" });

      // create user
      const user = await User.create({
        ...data,
        password: await bcrypt.hash(data.password, 8),
      });

      // JWT
      const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "48h",
      });

      res.status(200).json({
        user,
        token,
      });
    } catch (error) {
      res.status(500).json({ error: "server error" });
      console.log(error);
    }
  }

  async login(req, res) {
    try {
      const { number, password } = req.body;

      // check user
      const user = await User.findOne({ number });

      if (!user) {
        return res.status(404).json({ error: "Пользователь не найден!" });
      }

      // check pass
      const validPass = bcrypt.compareSync(password, user.password);

      if (!validPass) {
        return res.status(400).json({ error: "Неверный пароль" });
      }

      // JWT
      const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "48h",
      });

      return res.status(200).json({
        token,
        user,
      });
    } catch (error) {
      res.status(500).json({ error: "server error" });
      console.log(error);
    }
  }

  async auth(req, res) {
    try {
      const user = await User.findOne({ _id: req.user._id });

      const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
        expiresIn: "24h",
      });

      if (!token) {
        return res.status(404).json({
          error:
            "Токен устарел, либо пользователя с таким токеном не существует",
        });
      }

      res.status(200).json({
        token,
        user,
      });
    } catch (error) {
      res.status(500).json({ error: "server error" });
      console.log(error);
    }
  }
}

module.exports = new authController();
