const mongoose = require("mongoose");

let Vendor = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String
  },
  rating: {
    type: Number
  },
  reviews: {
    type: [String]
  }
});

module.exports = mongoose.model("Vendor", Vendor);
