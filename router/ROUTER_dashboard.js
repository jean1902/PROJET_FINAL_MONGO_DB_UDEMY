const express =require("express");
 const router = express.Router();
 const bodyParser = require("body-parser");
 const User = require("../models/user")
 let urlencodedParser = bodyParser.urlencoded({ extended: false });
 const session= require("express-session");
const passport =require("passport");
const passportLocalMongoose =require("passport-local");


 router.get("/dashboard" ,(req,res)=>{
    res.render("../views/dashboard");
 })
 router.get("/logout",(req,res)=>{
    req.logOut(function(err){
        if(err){
            console.log(err)
        }else{
            console.log("user deconnecte");
        }
    });
    res.redirect("/login")
 })

 module.exports = router;

