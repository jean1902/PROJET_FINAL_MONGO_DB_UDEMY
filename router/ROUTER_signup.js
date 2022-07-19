const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../models/user");
let urlencodedParser = bodyParser.urlencoded({ extended: false });
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local");

router.get("/signup", (req, res) => {
  res.render("../views/signup");
});

router.post("/signup", urlencodedParser, (req, res) => {
  //  const user ={
  //     username: req.body.username,                            // recuperer les donnes du formulaire et l'inserer dans la bd sans la session
  //     password :req.body.username
  //  }

  // User.create(user,function(err){
  //     if(err){
  //         console.log(err);
  //     } else{
  //         res.render("index")
  //     }
  //  })
  //  console.log(user)

  const newuser = new User({
    username: req.body.username,
  });
  User.register(newuser, req.body.password, function (err, user) {
    if (err) {
      console.log(err);
      return res.render("signup");
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("signup");
      });
    }
  });
  //
});

module.exports = router;
