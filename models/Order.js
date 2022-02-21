const { Schema, model, ObjectId } = require("mongoose");

const Order = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  surrenderOfMoney: {
    type: String,
    required: false,
  },
  timeToDelivery: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  products: {
    type: Array,
    required: true,
  },
});

module.exports = model("Order", Order);
