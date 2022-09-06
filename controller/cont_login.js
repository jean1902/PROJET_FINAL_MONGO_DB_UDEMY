
 const User = require("../models/user")
 const bodyParser = require("body-parser");
 let urlencodedParser = bodyParser.urlencoded({ extended: false });
 const session= require("express-session");
const passport =require("passport");
const flash = require("connect-flash");
const passportLocalMongoose =require("passport-local");
const Reset = require("../models/reset");



const loginController = class{
                static login_Get =(req,res)=>{
                    res.render("../views/login");

                }
                
                static login_Post=(req,res)=>{
                    //    User.findOne({username:req.body.username},function(err,foundUser){ // verifier que username exists dans la bd
                    //     if(err){
                    //         console.log(err);
                    //     } else{
                    //         console.log(foundUser ,'voila sa')
                    //         if(foundUser){
                    //             if(foundUser.password == req.body.password ){ // si username exits verifier si c'est meme mots de pass  et le connecter 
                    //                 console.log(foundUser)
                    //                 // res.redirect("index");
                    //             } else{
                    //                 res.send("error tu n'existe pas");
                    //             }
                            
                    //         }
                    //     }})
                    const user =new User({
                        username:req.body.username,
                        password:req.body.password,
                
                    })
                    req.login(user,function(err){
                        if(err){
                            console.log(err);
                        }else{
                            passport.authenticate("local")(req , res, function(){
                        
                                res.redirect("/dashboard")
                            })
                        }
                    })
                    
                        
                    
                       }
}
module.exports =loginController;