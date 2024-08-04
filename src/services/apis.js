// const BASE_URL = process.env.REACT_APP_BASE_URL
<<<<<<< HEAD
// const BASE_URL = "http://localhost:4000/api/v1"
const BASE_URL = "https://ed-backend-xssm.onrender.com/api/v1"

=======
const BASE_URL = process.env.REACT_APP_BASE_URL
<<<<<<< HEAD
// const BASE_URL = "http://localhost:4000/api/v1"
>>>>>>> cc12bde (auth + Db)
=======
>>>>>>> 97fe60f (done)

// AUTH ENDPOINTS
export const endpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    SIGNUP_API: BASE_URL + "/auth/signUp",
    LOGIN_API: BASE_URL + "/auth/login",
    RESETPASSWORDTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

export const categories = {
    CATEGORIES_API: BASE_URL + "/course/showAllCategories"
}

export const catalogData = {
    CATALOGPAGEDATA_API: BASE_URL + "/course/categoryPageDetails",
}

export const contactusEndpoints = {
    CONTACT_US_API: BASE_URL + "/reach/contact",
}

export const settingsEndpoints = {
    UPDATE_PROFILE_PICTURE_API: BASE_URL + "/profile/updateDisplayPictue",
    UPDATE_PROFILE_API: BASE_URL + "/profile/updateprofile",
    DELETE_ACCOUNT_API: BASE_URL + "/profile/deleteaccount",
    CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
}

// PROFILE ENDPOINTS

export const profileEndPoints = {
    GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourse",
    GET_USER_DETAILS_API: BASE_URL + "/profile/getalluserdetails",
    GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard"
}

// COURSE ENDPOINTS
export const courseEndPoints = {
    EDIT_COURSE_API: BASE_URL + "/course/editCourse",
    CREATE_COURSE_API: BASE_URL + "/course/createcourse",
    COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
    GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourse",
    DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
    UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
    CREATE_SECTION_API: BASE_URL + "/course/createSection",
    DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
    DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubsection",
    UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubsection",
    CREATE_SUBSECTION_API: BASE_URL + "/course/createSubSection",
    GET_ALL_COURSE_API: BASE_URL + "/course/showAllCourses",
    GET_FULL_COURSE_DETAILS_AUTHENTICATED: BASE_URL + "/course/getFullCourseDetails",
    COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
    CREATE_RATING_API: BASE_URL + "/course/createRating",
    LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress"
}

// PAYMENT ENDPOINTS (STUDENTS)
export const studentEndpoints = {
    COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment" ,
    COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
    SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail"
}

export const ratingsEndpoints = {
    REVIEWS_DETAILS_API: BASE_URL + "/course/getAllRating"
}