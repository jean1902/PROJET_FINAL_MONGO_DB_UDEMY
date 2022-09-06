const User = require("../models/user")
const bodyParser = require("body-parser");
let urlencodedParser = bodyParser.urlencoded({ extended: false });
const session= require("express-session");
const passport =require("passport");
const passportLocalMongoose =require("passport-local");

const Reset = require("../models/reset");

const  dashbordController = class{
    static dashbord= (req,res)=>{
        console.log(req.user)
        res.render("../views/dashboard" );
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
// fonction de coonnexion pour verifier si je suis connecter et afficher les autres page lorsque je suis connecter

// function is_LoggedIn(req,res,next){
//     if(req.isAuthenticated){
//         next();
//     } else{
//         res.redirect("/login")
//     }
// }



module.exports=dashbordController;