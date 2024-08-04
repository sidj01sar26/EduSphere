const express = require("express");
const router = express.Router();

// IMPORT CONTROLLERS
const {
    capturePayment,
    verifyPayment,
    sendPaymentSuccessEmail,
} = require("../controllers/Payment");

const {auth, isStudent, isAdmin, isInstructor} = require("../middlewares/auth");

// DEFINE API ROUTES
router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifyPayment", auth, isStudent, verifyPayment);
router.post("/sendPaymentSuccessEmail", auth, isStudent, sendPaymentSuccessEmail);

module.exports = router;