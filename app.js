const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const ejs =require("ejs");
const mongoose =require("mongoose");
const methodOverride = require("method-override");
const flash = require("connect-flash");
let urlencodedParser = bodyParser.urlencoded({ extended: false });
const router_signup= require("./router/ROUTER_signup");
const router_login=require("./router/ROUTER_login");
const router_dashboard= require("./router/ROUTER_dashboard");
const router_forgot =require("./router/ROUTER_forgot")
const port =1000;
const session= require("express-session");
const passport =require("passport");
const passportLocalMongoose =require("passport-local");
const randToken= require("rand-token");
const router_reset =require("./router/ROUTER_reset");



mongoose.connect("mongodb+srv://testWeb:test@cluster0.jxfd2.mongodb.net/cooking?retryWrites=true&w=majority" ,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
app.get("/",function(req,res){
    res.render("index");
})





//model
const User = require("./models/user");
const resetToken = require("./models/reset")

app.use(session ({
    secret:"mysecret",
    resave:false,                       // si 
    saveUninitialized: false            // la session na pas ete initialiser on ne l'enregistre pas
}))

app.use(passport.initialize());  //initialiser passport
app.use(passport.session());



//passport local mongoose  en utilisant une strategie qui va permette authentifier 

passport.use(User.createStrategy())  //passport local mongoose

passport.serializeUser(User.serializeUser()); //donner acceas a nos information a passport  de l'user connecte 
passport.deserializeUser (User.deserializeUser()); //  detruire les cookies ou session


app.set("view engine" ,"ejs");
app.set(" view","/view");
app.use("/public" , express.static("public"));
app.use("/" ,router_signup)
app.use("/" ,router_login)
app.use("/" ,router_dashboard)
app.use("/",router_forgot)
app.use("/", router_reset);

app.use(flash())
// app.use(function(req,res,next){
//     res.locals.currentUser =req.user;
//     req.locals.error=req.flash("error");
//     req.locals.success=req.flash("success")
//     next();
// })

//  passer des message avec flash 

app.listen( port , (req,res)=>{
    console.log('ecoute sur le port 1000');
})