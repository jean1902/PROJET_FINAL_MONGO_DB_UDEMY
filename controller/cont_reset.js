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
          }
        })
    
     }  
     
     static update_token_Password =function(req,res){
      Reset.findOne({
          resetPasswordToken:req.params.token,
          resetPasswordExpires:{$gt:  Date.now()}
        
      },function(err,obj){
        if(err){
          console.log("token expired");
          res.redirect("/login")
        }else{
         if(req.body.password == req.body.password2){
              User.findOne({ username: obj.username},function(err,user){
                  if(err){
                      console.log(err);
                  }else{
                    console.log(user);
                        user.update(req.body.password ,function(err){
                          if(err){
                              console.log(err);
                          }else{
                               user.save();
                              const updateReset ={
                                  resetPasswordToken:null,
                                  resetPasswordExpires:null
                              }
                              Reset.findOneAndUpdate({resetPasswordToken : req.params.token},updateReset,function(err,obj1){
                                  if(err){
                                      console.log(err);
  
                                  } else{
                                      // res.redirect("/login")
                                  }
                              })
                          }
                      })
                  }
              })
         }}
        })
   }

    
}
module.exports =resetController;