// Initialize express router
let router = require("express").Router();
let User = require("../../models/User");
let Product = require("../../models/Product");
const keys = require("../../config/key");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
  const { errors, isValid } = validateRegisterInput(req.body); // Check validation
  if (!isValid) {
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
        review: []
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
            res.json({
              success: true,
              token: "Bearer " + token,
              id: user._id
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
  Product.find({ userid: vid }, function(err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

router.post("/dispatch_item", function(req, res) {
  let vid = req.params.vid;
  Product.findByIdAndUpdate(req.body.pid, { status: "Dispatched" }, function(
    err,
    users
  ) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

router.get("/:vid/get_ready", function(req, res) {
  let vid = req.params.vid;
  Product.find({ userid: vid, status: "Ready" }, function(err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

// Export API routes
module.exports = router;
