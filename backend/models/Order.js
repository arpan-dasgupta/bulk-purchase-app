const mongoose = require("mongoose");

let Order = new mongoose.Schema({
  productid: {
    type: Schema.Types.ObjectId,
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
    type: Number
  }
});

module.exports = mongoose.model("Order", Order);
