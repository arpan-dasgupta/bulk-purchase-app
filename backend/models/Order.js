const mongoose = require("mongoose");

let Order = new mongoose.Schema({
  productid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  userid: {
    type: String,
    required: true
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
  num_rating: {
    type: Number
  },
  review: {
    type: String
  }
});

module.exports = mongoose.model("Order", Order);
