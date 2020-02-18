// Initialize express router
let router = require("express").Router();
let User = require("../../models/User");
let Product = require("../../models/Product");
let Order = require("../../models/Order");
const keys = require("../../config/key");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose_fuzzy_searching = require("mongoose-fuzzy-searching");
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Set default API response
router.get("/", function(req, res) {
  res.json({
    status: "API Its Working",
    message: "Welcome to RESTHub crafted with love!"
  });
});

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validationconst
  console.log(req.body);
  const { errors, isValid } = validateRegisterInput(req.body); // Check validation
  if (!isValid) {
    // console.log(errors);
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        user_type: req.body.user_type,
        rating: 0.0,
        review: [],
        num_rating: 0
      }); // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

router.post("/delete", (req, res) => {
  User.deleteMany(function(err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body); // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = {
          id: user._id,
          name: user.username
        };
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 3600
          },
          (err, token) => {
            return res.json({
              success: true,
              token: "Bearer " + token,
              id: user._id,
              type: user.user_type
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

// router.post("/add_user", function(req, res) {
//   console.log(req.body.name);
//   console.log(req.body.email);
//   let user = new User({
//     username: req.body.name,
//     email: req.body.email,
//     password: req.body.password,
//     rating: 0.0,
//     review: []
//   });
//   user
//     .save()
//     .then(user => {
//       res.status(200).json({ User: "User added successfully" });
//     })
//     .catch(err => {
//       res.status(400).send("Error");
//     });
// });

router.get("/get_users", function(req, res) {
  User.find(function(err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

// Vendor Endpoints

router.post("/:vid/add_item", function(req, res) {
  let vid = req.params.vid;
  // console.log(vid);
  let prod = new Product({
    productname: req.body.name,
    quantity: req.body.quantity,
    price: req.body.price,
    userid: vid,
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
  Product.find({ userid: vid }, function(err, prod) {
    if (err) {
      console.log(err);
    } else {
      res.json(prod);
    }
  });
});

router.post("/dispatch_item", function(req, res) {
  let vid = req.params.vid;
  Product.findByIdAndUpdate(req.body.pid, { status: "Dispatched" }, function(
    err,
    prod
  ) {
    if (err) {
      console.log(err);
    } else {
      res.json(prod);
    }
  });
});

router.get("/:vid/get_ready", function(req, res) {
  let vid = req.params.vid;
  Product.find({ userid: vid, status: "Ready" }, function(err, prod) {
    if (err) {
      console.log(err);
    } else {
      res.json(prod);
    }
  });
});

router.get("/:vid/get_dispatched", function(req, res) {
  let vid = req.params.vid;
  Product.find({ userid: vid, status: "Dispatched" }, function(err, prod) {
    if (err) {
      console.log(err);
    } else {
      res.json(prod);
    }
  });
});

router.get("/profile/:vid", function(req, res) {
  let vid = req.params.vid;
  User.find({ _id: vid, user_type: 1 }, function(err, users) {
    if (err) {
      console.log(err);
    } else {
      users.password = "";
      res.json(users);
    }
  });
});

// Customer Endpoints

// Product.plugin(mongoose_fuzzy_searching, { fields: ["productname"] });
router.get("/search", function(req, res) {
  // Product.mongoose_fuzzy_searching();
  Product.find({ productname: req.body.productname }, function(err, prod) {
    if (err) {
      console.log(err);
    } else {
      res.json(prod);
    }
  });
});

router.post("/place_order", function(req, res) {
  // Product.mongoose_fuzzy_searching();
  let ord = new Order({
    productid: req.body.pid,
    userid: req.body.vid,
    rated: false,
    reviewed: false,
    quantity: req.body.quantity
  });
  ord
    .save()
    .then(ord => {
      res.status(200).json({ Order: "Order placed successfully" });
    })
    .catch(err => {
      res.status(400).send("Error");
    });
});

router.get("/:vid/order_stats", function(req, res) {
  // Product.mongoose_fuzzy_searching();
  Order.find({ userid: req.params.vid }, function(err, ord) {
    if (err) {
      console.log(err);
    } else {
      res.json(ord);
    }
  });
});

router.post("/edit_order", function(req, res) {
  Order.findByIdAndUpdate(
    req.body.oid,
    {
      productid: req.body.pid,
      userid: req.body.vid,
      rated: false,
      reviewed: false,
      quantity: req.body.quantity
    },
    function(err, prod) {
      if (err) {
        res.status(400).send("Error");
      } else {
        res.status(200).json({ Order: "Order edited successfully" });
      }
    }
  );
});

//TODO: fix review and rate

router.post("/rate", function(req, res) {
  Order.findById(req.body.oid, function(err, ord) {
    if (err) {
      res.status(400).send("Error");
    } else {
      Product.findById(ord.productid, function(err, prod) {
        if (err) {
          res.status(400).send("Error");
        } else {
          User.findByIdAndUpdate(
            prod.userid,
            {
              num_rating: num_rating + 1,
              rating: (rating + req.body.rating) / num_rating
            },
            function(err, user) {
              if (err) {
                res.status(400).send("Error");
              } else {
                Order.findByIdAndUpdate(req.body.oid, { rated: true });
                res.status(200).send("Successfully rated");
              }
            }
          );
        }
      });
    }
  });
});

router.post("/review", function(req, res) {
  Order.findById(req.body.oid, function(err, ord) {
    if (err) {
      res.status(400).send("Error");
    } else {
      Product.findById(ord.productid, function(err, prod) {
        if (err) {
          res.status(400).send("Error");
        } else {
          User.findByIdAndUpdate(
            prod.userid,
            {
              reviews: reviews.push(req.body.review)
            },
            function(err, user) {
              if (err) {
                res.status(400).send("Error");
              } else {
                Order.findByIdAndUpdate(req.body.oid, { reviewed: true });
                res.status(200).send("Successfully reviewed");
              }
            }
          );
        }
      });
    }
  });
});

// Export API routes
module.exports = router;
