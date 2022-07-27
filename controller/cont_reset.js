const User = require("../models/user")
const bodyParser = require("body-parser");
let urlencodedParser = bodyParser.urlencoded({ extended: false });
const session= require("express-session");
const passport =require("passport");
const passportLocalMongoose =require("passport-local");
const Reset = require("../models/reset");

const resetController= class{
    static reset = (req,res)=>{
        res.render("../views/reset",{token:req.params.token})
}

    static tokenPage_redirection =function(req,res){
        Reset.findOne({
            resetPasswordToken:req.params.token,
            resetPasswordExpires:{$gt:  Date.now()}
          
        },function(err,obj){
          if(err){
            console.log(err);
          
          }else{
            res.render("../views/reset",{token:req.params.token})
            res.redirect("/login")
          }
        })
    
     }                                                  
    
}
module.exports =resetController;