// Initialize express router
let router = require("express").Router();
let User = require("../../models/User");
let Product = require("../../models/Product");
let Order = require("../../models/Order");
let VRating = require("../../models/VRating");
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
        rating: 0,
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

// Admin endpoints

router.get("/get_users", function(req, res) {
  User.find(function(err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

router.post("/delete_prods", (req, res) => {
  Product.deleteMany(function(err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

router.post("/delete_orders", (req, res) => {
  Order.deleteMany(function(err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
    }
  });
});

router.get("/prods", function(req, res) {
  // Product.mongoose_fuzzy_searching();
  Product.find({}, function(err, ord) {
    if (err) {
      console.log(err);
    } else {
      res.json(ord);
    }
  });
});

router.get("/orders", function(req, res) {
  // Product.mongoose_fuzzy_searching();
  Order.find({}, function(err, ord) {
    if (err) {
      console.log(err);
    } else {
      res.json(ord);
    }
  });
});

router.get("/vrat", function(req, res) {
  // Product.mongoose_fuzzy_searching();
  VRating.find({}, function(err, ord) {
    if (err) {
      console.log(err);
    } else {
      res.json(ord);
    }
  });
});

router.post("/vratdelete", (req, res) => {
  VRating.deleteMany(function(err, users) {
    if (err) {
      console.log(err);
    } else {
      res.json(users);
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
    status: "Waiting",
    rating: 0,
    num_rating: 0
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

router.post("/:pid/cancel_item", function(req, res) {
  User.findOne({ _id: req.body.vid, user_type: 1 }, function(err, users) {
    if (err) {
      console.log(err);
    } else {
      console.log(users);
      if (users === null) {
        res.status(403).json();
        return;
      } else {
        Product.findByIdAndUpdate(
          req.params.pid,
          { status: "Cancelled" },
          function(err, users) {
            if (err) {
              console.log(err);
            } else {
              res.json(users);
            }
          }
        );
      }
    }
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
  let vid = req.body.vid;
  console.log(req.body.pid, vid);
  Product.findOneAndUpdate(
    { _id: req.body.pid, userid: vid },
    { status: "Dispatched" },
    function(err, prod) {
      if (err) {
        console.log(err);
        res.status(400).json();
      } else {
        if (prod == null) res.status(403).json();
        else res.json(prod);
      }
    }
  );
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

router.get("/all_prods", function(req, res) {
  Product.find({})
    .populate("userid")
    .exec(function(err, prod) {
      if (err) {
        console.log(err);
      } else {
        console.log(prod);
        res.json(prod);
      }
    });
});

function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

router.post("/search", function(req, res) {
  // Product.mongoose_fuzzy_searching();
  // console.log(req.body.productname);
  const regex = new RegExp(escapeRegex(req.body.productname), "gi");
  Product.find({ productname: regex })
    .populate("userid")
    .exec(function(err, prod) {
      if (err) {
        console.log(err);
      } else {
        console.log(prod);
        res.json(prod);
      }
    });
});

router.post("/place_order", function(req, res) {
  // Product.mongoose_fuzzy_searching();
  if (req.body.quantity == 0) res.status(403).json();

  User.findOne({ _id: req.body.cid, user_type: 2 }, function(err, users) {
    if (err) {
      console.log(err);
      res.status(403).json();
    } else {
      console.log(users);
      if (users === null) {
        res.status(403).json();
        return;
      } else {
        Product.findById(req.body.pid, function(e, prod) {
          if (e) console.log(err);
          else {
            console.log(prod.quantity);
            console.log(req.body.quantity);
            if (prod.quantity < req.body.quantity) {
              res.status(400).json();
            } else if (prod.quantity == req.body.quantity) {
              Product.findByIdAndUpdate(
                req.body.pid,
                {
                  status: "Ready",
                  quantity: 0
                },
                function(rr, pp) {
                  if (rr) console.log("no0");
                  else console.log("ye3");
                }
              );
              let ord = new Order({
                productid: req.body.pid,
                userid: req.body.cid,
                rated: false,
                reviewed: false,
                quantity: req.body.quantity,
                rating: 0,
                num_rating: 0,
                review: ""
              });
              ord
                .save()
                .then(ord => {
                  res.status(200).json({ Order: "Order placed successfully" });
                })
                .catch(err => {
                  res.status(400).send("Error");
                });
            } else {
              console.log(prod.quantity - req.body.quantity);
              var x = prod.quantity - req.body.quantity;
              Product.findByIdAndUpdate(
                req.body.pid,
                {
                  quantity: x
                },
                function(rr, pp) {
                  if (rr) console.log("no");
                  else console.log("ye");
                }
              );
              let ord = new Order({
                productid: req.body.pid,
                userid: req.body.cid,
                rated: false,
                reviewed: false,
                quantity: req.body.quantity,
                rating: 0,
                review: ""
              });
              ord
                .save()
                .then(ord => {
                  res.status(200).json({ Order: "Order placed successfully" });
                })
                .catch(err => {
                  res.status(400).send("Error");
                });
            }
          }
        });
      }
    }
  });
});

router.post("/edit_order", function(req, res) {
  // Product.mongoose_fuzzy_searching();
  if (req.body.quantity < 0) res.status(403).json();

  User.findOne({ _id: req.body.cid, user_type: 2 }, function(err, users) {
    if (err) {
      console.log(err);
      res.status(403).json();
    } else {
      // console.log(users);
      if (users === null) {
        res.status(403).json();
        return;
      } else {
        Order.findById(req.body.oid, function(e, ord) {
          if (e) console.log(err);
          else {
            if (ord == null) res.status(403).json();
            else if (ord.quantity == req.body.quantity) {
              res.status(403).json();
            } else {
              console.log("here 1");
              Product.findOne(
                { _id: ord.productid, status: { $in: ["Waiting", "Ready"] } },
                function(rr, pp) {
                  if (rr) {
                    console.log("no");
                    res.status(403).json();
                  } else {
                    console.log("here 2");
                    // console.log(pp.quantity);
                    // console.log(ord.quantity);
                    // console.log(req.body.quantity);
                    if (pp == null) res.status(403).json();
                    else if (ord.quantity > req.body.quantity) {
                      console.log("here 3");
                      var x = ord.quantity + pp.quantity - req.body.quantity;
                      if (pp.quantity == 0) {
                        Product.findByIdAndUpdate(
                          pp._id,
                          { quantity: x, status: "Waiting" },
                          function(rte, y) {
                            if (rte) console.log(rte);
                            else console.log("yay");
                          }
                        );
                      } else {
                        Product.findByIdAndUpdate(
                          pp._id,
                          { quantity: x },
                          function(rte, y) {
                            if (rte) console.log(rte);
                            else console.log("yay");
                          }
                        );
                      }
                      Order.findByIdAndUpdate(
                        ord._id,
                        {
                          quantity: req.body.quantity
                        },
                        function(rte, y) {
                          if (rte) console.log(rte);
                          else console.log("yay");
                        }
                      );
                      res.status(200).json();
                    } else {
                      if (ord.quantity + pp.quantity > req.body.quantity) {
                        var x = ord.quantity + pp.quantity - req.body.quantity;
                        Product.findByIdAndUpdate(
                          pp._id,
                          { quantity: x },
                          function(rte, y) {
                            if (rte) console.log(rte);
                            else console.log("yay");
                          }
                        );
                        Order.findByIdAndUpdate(
                          ord._id,
                          {
                            quantity: req.body.quantity
                          },
                          function(rte, y) {
                            if (rte) console.log(rte);
                            else console.log("yay");
                          }
                        );
                        res.status(200).json();
                      } else if (
                        ord.quantity + pp.quantity ==
                        req.body.quantity
                      ) {
                        var x = ord.quantity + pp.quantity - req.body.quantity;
                        Product.findByIdAndUpdate(
                          pp._id,
                          { quantity: x, status: "Ready" },
                          function(rte, y) {
                            if (rte) console.log(rte);
                            else console.log("yay");
                          }
                        );
                        Order.findByIdAndUpdate(
                          ord._id,
                          {
                            quantity: req.body.quantity
                          },
                          function(rte, y) {
                            if (rte) console.log(rte);
                            else console.log("yay");
                          }
                        );
                        res.status(200).json();
                      } else {
                        res.status(403).json();
                      }
                    }
                  }
                }
              );
            }
          }
        });
      }
    }
  });
});

router.get("/:vid/order_stats", function(req, res) {
  // Product.mongoose_fuzzy_searching();
  Order.find({ userid: req.params.vid })
    .populate("productid")
    .exec(function(err, ord) {
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

router.post("/rate_vendor", function(req, res) {
  // Order.findById(req.body.oid, function(err, ord) {
  //   if (err) {
  //     res.status(400).send("Error");
  //   } else {
  //     Product.findById(ord.productid, function(err, prod) {
  //       if (err) {
  //         res.status(400).send("Error");
  //       } else {
  //         User.findByIdAndUpdate(
  //           prod.userid,
  //           {
  //             num_rating: num_rating + 1,
  //             rating: (rating + req.body.rating) / num_rating
  //           },
  //           function(err, user) {
  //             if (err) {
  //               res.status(400).send("Error");
  //             } else {
  //               Order.findByIdAndUpdate(req.body.oid, { rated: true });
  //               res.status(200).send("Successfully rated");
  //             }
  //           }
  //         );
  //       }
  //     });
  //   }
  // });
  req.body.rating = parseFloat(req.body.rating);
  console.log(req.body.rating);
  if (req.body.rating > 5 || req.body.rating < 0) {
    res.status(403).json();
    return;
  }
  VRating.findOne({ v_id: req.body.vid, c_id: req.body.cid }, function(
    err,
    rte
  ) {
    if (err) {
      res.status(400).send("Error");
    } else {
      if (rte == null) {
        // console.log("here");
        let rat = new VRating({
          c_id: req.body.cid,
          v_id: req.body.vid,
          rating: req.body.rating
        });
        rat
          .save()
          .then(prod => {
            User.findById(req.body.vid, function(e, r) {
              if (e) {
                res.status(403).json();
              } else {
                if (r == null) res.status(403).json();
                else {
                  User.findByIdAndUpdate(
                    req.body.vid,
                    {
                      rating:
                        parseFloat(r.rating) + parseFloat(req.body.rating),
                      num_rating: parseFloat(r.num_rating) + 1
                    },
                    function(ee, rr) {}
                  );
                }
              }
            });
            res.status(200).json({ Rating: "Rating added successfully" });
          })
          .catch(err => {
            res.status(400).send("Error");
          });
      } else {
        // console.log(rte.rating, req.body.rating);
        User.findById(rte.v_id, function(e, r) {
          if (e) {
            res.status(403).json();
          } else {
            // console.log(rte.rating, req.body.rating);
            if (r == null) res.status(403).json();
            else {
              // console.log(rte.rating, req.body.rating);
              User.findByIdAndUpdate(
                rte.v_id,
                {
                  rating:
                    parseFloat(r.rating) -
                    parseFloat(rte.rating) +
                    parseFloat(req.body.rating)
                },
                function(ee, rr) {}
              );
              VRating.findOneAndUpdate(
                { v_id: req.body.vid, c_id: req.body.cid },
                { rating: parseFloat(req.body.rating) },
                function(eewe, uydg) {}
              );
              res.status(200).json({ Rating: "Rating added successfully" });
            }
          }
        });
      }
    }
  });
});

router.post("/rate_order", function(req, res) {
  req.body.rating = parseFloat(req.body.rating);
  console.log(req.body.rating);
  if (req.body.rating > 5 || req.body.rating < 0) {
    res.status(403).json();
    return;
  }
  Order.findById(req.body.oid, function(err, rte) {
    if (err) {
      res.status(400).send("Error");
    } else {
      if (rte.rated === false) {
        console.log("here");
        Product.findById(rte.productid, function(e, r) {
          if (e) {
            res.status(403).json();
          } else {
            if (r == null) res.status(403).json();
            else {
              console.log(r.rating);
              Product.findByIdAndUpdate(
                rte.productid,
                {
                  rating: parseFloat(r.rating) + parseFloat(req.body.rating),
                  num_rating: parseFloat(r.num_rating) + 1
                },
                function(ee, rr) {
                  Order.findByIdAndUpdate(
                    req.body.oid,
                    { rated: true },
                    function(eee, rrr) {
                      console.log("here");
                    }
                  );
                }
              );
            }
          }
        });
        res.status(200).json({ Rating: "Rating added successfully" });
      } else {
        // console.log(rte.rating, req.body.rating);
        res.status(403).json();
      }
    }
  });
});

router.post("/review_order", function(req, res) {
  req.body.rating = parseFloat(req.body.rating);
  console.log(req.body.rating);
  if (req.body.rating > 5 || req.body.rating < 0) {
    res.status(403).json();
    return;
  }
  Order.findById(req.body.oid, function(err, rte) {
    if (err) {
      res.status(400).send("Error");
    } else {
      if (rte.reviewed === false) {
        console.log("here");
        Order.findByIdAndUpdate(
          req.body.oid,
          { reviewed: true, review: req.body.review },
          function(eee, rrr) {
            console.log("here");
          }
        );
        res.status(200).json({ Review: "Review added successfully" });
      } else {
        // console.log(rte.rating, req.body.rating);
        res.status(403).json();
      }
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

router.post("/get_vend_reviews", function(req, res) {
  Order.find({})
    .populate("productid")
    .exec(function(err, prod) {
      if (err) {
        console.log(err);
      } else {
        console.log(prod);
        res.json(
          prod.filter(function(o) {
            return (
              o.productid != null &&
              o.review != "" &&
              o.review != null &&
              o.productid.userid == req.body.vid
            );
          })
        );
      }
    });
});

// Export API routes
module.exports = router;
