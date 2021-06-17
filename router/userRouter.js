const express = require("express");
const router = express.Router();
const userFunction = require("../controler/userFunction");
router.post("/signup", userFunction.signUp);
router.post("/signin", userFunction.signIn);

module.exports = router;
