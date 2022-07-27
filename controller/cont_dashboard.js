const User = require("../models/user")
const bodyParser = require("body-parser");
let urlencodedParser = bodyParser.urlencoded({ extended: false });
const session= require("express-session");
const passport =require("passport");
const passportLocalMongoose =require("passport-local");
const Reset = require("../models/reset");

const  dashbordController = class{
    static dashbord= (req,res)=>{
        res.render("../views/dashboard");
     }

     static logout =(req,res)=>{
        req.logOut(function(err){
            if(err){
                console.log(err)
            }else{
                console.log("user deconnecte");
            }
        });
        res.redirect("/login")
    }
}


module.exports=dashbordController;