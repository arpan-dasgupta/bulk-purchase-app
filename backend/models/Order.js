const mongoose = require("mongoose");

let Order = new mongoose.Schema({
  productid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  userid: {
    type: String
  },
  rated: {
    type: Boolean
  },
  reviewed: {
    type: Boolean
  },
  quantity: {
    required: true,
    type: Number
  },
  rating: {
    type: Number
  },
  review: {
    type: String
  }
});

module.exports = mongoose.model("Order", Order);
