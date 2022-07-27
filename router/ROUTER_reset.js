const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
let urlencodedParser = bodyParser.urlencoded({ extended: false });
const resetController = require("../controller/cont_reset");

router.get("/reset", resetController.reset);

router.get("/reset/:token", resetController.tokenPage_redirection);

router.post( "/reset/:token",urlencodedParser, resetController.tokenPage_redirection);

module.exports = router;
