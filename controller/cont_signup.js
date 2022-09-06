const User = require("../models/user");
const bodyParser = require("body-parser");
let urlencodedParser = bodyParser.urlencoded({ extended: false });
const session= require("express-session");
const passport =require("passport");
const passportLocalMongoose =require("passport-local");
const Reset = require("../models/reset");

const  signupController = class{
     static signup_Get =  (req, res) => {
            res.render("../views/signup");
    }
    static signup_Post =(req, res) => {
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
            passport.authenticate("local")(req, res, function(){
              res.redirect("/login");
            });
          }
        });
        //
      }

     
}
module.exports= signupController;