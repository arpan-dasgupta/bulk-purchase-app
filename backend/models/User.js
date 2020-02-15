const mongoose = require("mongoose");

let User = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  user_type: {
    type: Number,
    required: true
  },
  email: {
    type: String
  },
  rating: {
    type: Number
  },
  num_rating: {
    type: Number
  },
  reviews: {
    type: [String]
  }
});

module.exports = mongoose.model("User", User);
