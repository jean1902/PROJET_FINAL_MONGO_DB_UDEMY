const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
let urlencodedParser = bodyParser.urlencoded({ extended: false });
const signupController= require ("../controller/cont_signup")

router.get("/signup", signupController.signup_Get);
router.post("/signup",urlencodedParser, signupController.signup_Post)



module.exports = router;
