const { Schema, model, ObjectId } = require("mongoose");

const User = new Schema({
  password: {
    type: String,
    required: true,
    min: 6,
    max: 20,
  },
  number: {
    required: true,
    unique: true,
    type: String,
  },
  email: {
    type: String,
  },
  name: {
    type: String,
  },
  address: {
    type: String,
  },
  cart: {
    type: Array,
    default: [],
  },
  orders: {
    type: Array,
    default: [],
  },
  amountCart: {
    type: Number,
    default: 0,
  },
  subscribe: {
    type: Boolean,
    default: false,
  },
});

module.exports = model("User", User);
