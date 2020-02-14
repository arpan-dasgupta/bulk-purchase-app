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
  vendorid: {
    type: String
  },
  image: {
    type: String
  }
});

module.exports = mongoose.model("Product", Product);
