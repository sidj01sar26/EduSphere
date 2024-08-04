const express = require("express");
const router = express.Router();

// IMPORT CONTROLLERS
const {login, signUp, changePassword, sendotp} = require("../controllers/Auth");
const {resetPasswordToken, resetPassword} = require("../controllers/ResetPassword");
const {auth} = require("../middlewares/auth");

// DEFINE API ROUTES
router.post("/sendotp", sendotp);
router.post("/login", login);
router.post("/signup", signUp);
router.post("/changepassword", auth, changePassword);

router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);



module.exports = router;