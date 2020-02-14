const mongoose = require("mongoose");

let Customer = new mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  email: {
    type: String
  }
});

module.exports = mongoose.model("Customer", Customer);
