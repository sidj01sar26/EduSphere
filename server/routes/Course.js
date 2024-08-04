const express = require("express");
const router = express.Router();

// IMPORT CONTROLLERS
const {createCourse, showAllCourses, getCourseDetails, getInstructorCourse, deleteCourse, editCourse, getFullCourseDetails} = require("../controllers/Course");
const {createCategory, showAllCategories, categoryPageDetails} = require("../controllers/Category");
const {createSection, updateSection, deleteSection} = require("../controllers/Section");
const {createSubSection, updateSubsection, deleteSubsection} = require("../controllers/Subsection");
const {createRating, getAverageRating, getAllRating} = require("../controllers/RatingAndReview");

const {updateCourseProgress} = require("../controllers/courseProgress")

const {auth, isStudent, isInstructor, isAdmin} = require("../middlewares/auth");

// DEFINE API ROUTE

// COURSE
router.post("/createcourse",auth, isInstructor, createCourse);
router.get("/showAllCourses", showAllCourses);
router.post("/getCourseDetails", getCourseDetails);
router.get("/getInstructorCourse", auth, isInstructor, getInstructorCourse);
router.delete("/deleteCourse", deleteCourse);
router.post("/editCourse", auth, isInstructor, editCourse );
router.post("/getFullCourseDetails", auth, getFullCourseDetails);

// SECTION
router.post("/createSection",auth, isInstructor, createSection);
router.post("/updateSection",auth, isInstructor, updateSection);
router.post("/deleteSection",auth, isInstructor, deleteSection);

// SUB-SECTION
router.post("/createSubSection", auth, isInstructor, createSubSection);
router.post("/updateSubsection", auth, isInstructor, updateSubsection);
router.post("/deleteSubsection", auth, isInstructor, deleteSubsection);

// CATEGORY
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/showAllCategories", showAllCategories);
router.post("/categoryPageDetails", categoryPageDetails);

// RATING-REVIEW
router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getAllRating", getAllRating);

// COURSE PROGRESS
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress)

module.exports = router;