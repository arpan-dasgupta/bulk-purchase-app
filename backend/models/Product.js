const mongoose_fuzzy_searching = require("mongoose-fuzzy-searching");
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
    type: String
  },
  image: {
    type: String
  }
});

Product.plugin(mongoose_fuzzy_searching, { fields: ["productname", "price"] });

module.exports = mongoose.model("Product", Product);
