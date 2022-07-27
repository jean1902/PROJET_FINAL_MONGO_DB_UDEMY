const express =require("express");
 const router = express.Router();
 const bodyParser = require("body-parser");
 const User = require("../models/user")
 let urlencodedParser = bodyParser.urlencoded({ extended: false });
 const session= require("express-session");
const passport =require("passport");
const passportLocalMongoose =require("passport-local");
const dashbordController =require('../controller/cont_dashboard');


 router.get("/dashboard" ,dashbordController.dashbord) 
 router.get("/logout" ,dashbordController.logout)

 module.exports = router;

