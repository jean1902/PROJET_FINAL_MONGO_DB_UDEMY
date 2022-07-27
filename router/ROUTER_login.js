const express =require("express");
 const router = express.Router();
 const bodyParser = require("body-parser");
 const flash = require("connect-flash");
 let urlencodedParser = bodyParser.urlencoded({ extended: false });

const loginController = require('../controller/cont_login');



 router.get("/login",loginController.login_Get)
router.post("/login" ,urlencodedParser,loginController.login_Post)    

module.exports =router;