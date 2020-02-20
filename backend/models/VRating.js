const mongoose = require("mongoose");

let Vrating = new mongoose.Schema({
  v_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  c_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model("Vrating", Vrating);
