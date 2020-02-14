// Initialize express router
let router = require("express").Router();
let Vendor = require("../../models/Vendor");
let Product = require("../../models/Product");

// Set default API response
router.get("/", function(req, res) {
  res.json({
    status: "API Its Working",
    message: "Welcome to RESTHub crafted with love!"
  });
});

router.post("/add_vendor/", function(req, res) {
  console.log(req.body.name);
  console.log(req.body.email);
  let vendor = new Vendor({
    username: req.body.name,
    email: req.body.email,
    password: req.body.password,
    rating: 0.0,
    review: []
  });
  vendor
    .save()
    .then(vendor => {
      res.status(200).json({ Vendor: "Vendor added successfully" });
    })
    .catch(err => {
      res.status(400).send("Error");
    });
});

router.get("/get_vendors", function(req, res) {
  Vendor.find(function(err, vendors) {
    if (err) {
      console.log(err);
    } else {
      res.json(vendors);
    }
  });
});

router.post("/:vid/add_item", function(req, res) {
  let vid = req.params.vid;
  // console.log(vid);
  let prod = new Product({
    productname: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
    vendorid: vid,
    image: req.body.image,
    status: "Waiting"
  });
  prod
    .save()
    .then(prod => {
      res.status(200).json({ Product: "Product added successfully" });
    })
    .catch(err => {
      res.status(400).send("Error");
    });
});

router.get("/:vid/get_items", function(req, res) {
  let vid = req.params.vid;
  Product.find({ vendorid: vid }, function(err, vendors) {
    if (err) {
      console.log(err);
    } else {
      res.json(vendors);
    }
  });
});

router.post("/dispatch_item", function(req, res) {
  let vid = req.params.vid;
  Product.findByIdAndUpdate(req.body.pid, { status: "Dispatched" }, function(
    err,
    vendors
  ) {
    if (err) {
      console.log(err);
    } else {
      res.json(vendors);
    }
  });
});

router.get("/:vid/get_ready", function(req, res) {
  let vid = req.params.vid;
  Product.find({ vendorid: vid, status: "Ready" }, function(err, vendors) {
    if (err) {
      console.log(err);
    } else {
      res.json(vendors);
    }
  });
});

// Export API routes
module.exports = router;
