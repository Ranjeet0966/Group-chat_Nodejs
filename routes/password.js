const passwordcontrollers = require("../controllers/password");
const express = require("express");
const router = express.Router();


router.post("/forgot-Password", passwordcontrollers.generateforgotPasswordLink);

router.get("/forgot-Password/:id", passwordcontrollers.resetPassword);

router.get("/update-password/:resetpasswordid", passwordcontrollers.updatepassword);



module.exports = router;