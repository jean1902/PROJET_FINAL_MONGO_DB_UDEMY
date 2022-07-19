const express =require("express");
 const router = express.Router();
 const bodyParser = require("body-parser");
 const User = require("../models/user")
 let urlencodedParser = bodyParser.urlencoded({ extended: false });
 const session= require("express-session");
const passport =require("passport");
const passportLocalMongoose =require("passport-local");
const randToken= require("rand-token");
const Reset = require("../models/reset");
const nodemailer =require("nodemailer");


 router.get("/forgot" ,(req,res)=>{
    res.render("../views/forgot");
 })

router.post("/forgot", urlencodedParser,(req,res)=>{
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
                    user:"cin71781g@gmail.com",
                    pass:"1234"
                }
            });
             const mailOptions ={
                from:"cin71781@gmail.com",
                to:req.body.username,
                subject:" reset your password",
                text:"click on this link for reset passord:http://localhost:1000/reset" + token
             }
             console.log("le mail est pret a etre envoye")
             transporter.sendMail(mailOptions,function(err,response){

                if(err){
                    console.log(err);
                 
                } else{
                    res.redirect("/login");
                }
             })

        }
    })
})

 module.exports=router;