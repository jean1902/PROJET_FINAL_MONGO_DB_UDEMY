const express =require("express");
 const router = express.Router();
 const bodyParser = require("body-parser");
 const User = require("../models/user")
 let urlencodedParser = bodyParser.urlencoded({ extended: false });
 const session= require("express-session");
const passport =require("passport");
const passportLocalMongoose =require("passport-local");


 router.get("/login" ,(req,res)=>{
    res.render("../views/login");
 })


 
router.post("/login" ,urlencodedParser,(req,res)=>{
//    User.findOne({username:req.body.username},function(err,foundUser){ // verifier que username exists dans la bd
//     if(err){
//         console.log(err);
//     } else{
//         if(foundUser){
//             if(foundUser.password == req.body.password){ // si username exits verifier si c'est meme mots de pass  et le connecter 
//                 res.redirect("index");
//             } else{
//                 res.send("error tu n'existe pas");
//             }
//         }
//     }

     const user = new User({
        username:req.body.username,
        password:req.body.password
     })
     req.login(user,function(err){                  //connecter l'utilisateur
        if(err){
            console.log(err)
        }else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/dashboard")
            })
        }
     })


   })    





 module.exports =router;