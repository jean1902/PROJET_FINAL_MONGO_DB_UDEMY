
 const User = require("../models/user")
 const bodyParser = require("body-parser");
 let urlencodedParser = bodyParser.urlencoded({ extended: false });
 const session= require("express-session");
const passport =require("passport");
const passportLocalMongoose =require("passport-local");
const randToken= require("rand-token");
const nodemailer =require("nodemailer");
const Reset = require("../models/reset");

const ForgotController = class{
     static  forgot_get = (req,res)=>{
    res.render("../views/forgot");
    }
    static forgot_post = (req,res)=>{
        User.find({username_reset:req.body.username_reset},function(err,userFound){
            if(err){
                console.log(err);
                res.redirect("/login");
            } else{
                const token =randToken.generate(16);
                console.log(token);
                Reset.create({
                    username: userFound.username,
                    resetPasswordToken:token,
                    resetPasswordExpires:Date.now() +3600000  //  date actuelle suivi d'une heure convertit en ms 
                })
                const transporter =nodemailer.createTransport({
                    service:"gmail",
                    auth:{
                        user:"jeantiero41@gmail.com",
                        pass:"yehvkvlnhumoljka"
                    }
                });
                 const mailOptions ={
                    from:"jeantiero41@gmail.com",
                    to:req.body.username_reset,
                    subject:" reset your password",
                    text:"click on this link for reset passord :http://localhost:1000/reset/" + token
                 }
                 console.log("le mail est pret a etre envoye")
                 console.log(req.body.username_reset)
                 transporter.sendMail(mailOptions,function(err,response){
    
                    if(err){
                        console.log(err);
                     
                    } else{
                        res.redirect("/login");
                    }
                 })
    
            }
        })
    }
}
module.exports= ForgotController;