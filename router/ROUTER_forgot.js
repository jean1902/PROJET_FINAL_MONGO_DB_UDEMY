const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const User = require("../models/user");
let urlencodedParser = bodyParser.urlencoded({ extended: false });
const Reset = require("../models/reset");

const ForgotController = require("../controller/cont_forgot");

router.get("/forgot", ForgotController.forgot_get);

router.post("/forgot", urlencodedParser, ForgotController.forgot_post);

module.exports = router;
