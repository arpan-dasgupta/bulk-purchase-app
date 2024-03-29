const mongoose = require("mongoose");

let Product = new mongoose.Schema({
  productname: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  status: {
    type: String
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  image: {
    type: String
  },
  rating: {
    type: Number
  },
  num_rating: {
    type: Number
  }
});

module.exports = mongoose.model("Product", Product);
