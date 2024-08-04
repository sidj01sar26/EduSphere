const express = require("express");
const router = express.Router();

// IMPORT CONTROLLERS
const {updateProfile, deleteAccount, getAllUserDetails, updateDisplayPictue, getEnrolledCourse, instructorDashboard} = require("../controllers/Profile");
const {auth, isInstructor} = require("../middlewares/auth");

// DEFINE API ROUTES
router.put("/updateprofile", auth, updateProfile);
router.delete("/deleteaccount", auth, deleteAccount);
router.get("/getalluserdetails", auth, getAllUserDetails);
router.put("/updateDisplayPictue", auth, updateDisplayPictue);
router.get("/getEnrolledCourse", auth, getEnrolledCourse);
router.get("/instructorDashboard", auth, isInstructor , instructorDashboard);

module.exports = router;