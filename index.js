const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");

const corsMiddleware = require("./middleware/cors.middleware");

const authRouter = require("./routes/auth.routes");
const cartRouter = require("./routes/cart.routes");
const userRouter = require("./routes/user.routes");
const productsRouter = require("./routes/products.routes");
const orderRouter = require("./routes/order.routes");

const app = express();

dotenv.config();

app.use(express.json());
app.use(helmet());
app.use(
  morgan(
    "dev",
    ":method :url :status :res[content-length] - :response-time ms - [:date[clf]]"
  )
);
app.use(corsMiddleware);

// routes
app.use("/api/auth", authRouter);
app.use("/api/cart", cartRouter);
app.use("/api/user", userRouter);
app.use("/api/products", productsRouter);
app.use("/api/order", orderRouter);

// mongoDB connect
mongoose
  .connect(process.env.URL_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log(`Сервер запущен http://localhost:${process.env.PORT}`);
    })
  )
  .catch(console.log);
