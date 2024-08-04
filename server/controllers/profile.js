const User = require("../models/User");
const Profile = require("../models/Profile");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const { convertSecondsToDuration } = require("../../src/utils/secToDuration");
const CourseProgress = require("../models/CourseProgress");
const { default: mongoose } = require("mongoose");
const Course = require("../models/Course");

exports.updateProfile = async (req, res) => {
    try{

        // get Data
        const {
            firstName = "",
            lastName = "",
            dateOfBirth = "", 
            about = "", 
            contactNumber = "",
            gender = "",
        } = req.body; 

        // Get userId
        const id = req.user.id;
        // console.log(id)

        // Validation
        // if(!contactNumber || !id){
        //     return res.status(400).json({
        //         success: false,
        //         message: "All Fields are required",
        //     })
        // }

        // find Profile
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);

        const user = await User.findByIdAndUpdate(id, {
            firstName,
            lastName,
        })
        await user.save()

        // Update Profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        profileDetails.gender = gender;

        await profileDetails.save();

        // Find the updated user details
        const updatedUserDetails = await User.findById(id)
        .populate("additionalDetails")
        .exec()

        // Return Response
        return res.json({
            success: true,
            message: "Profile Updated Successfully",
            updatedUserDetails,
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Unable to update profile, Please Try Again",
            error:error.message,
        });
    }
}

// DELETE ACCOUNT
exports.deleteAccount = async (req, res) => {
    try{

        // TODO: Find More on Job Schedule
		// const job = schedule.scheduleJob("10 * * * * *", function () {
		// 	console.log("The answer to life, the universe, and everything!");
		// });
		// console.log(job);

        // get id
        const id = req.user.id;

        // validation
        const user = await User.findById({ _id: id });
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User Not Found",
            });
        }

        // delete Profile
        await Profile.findByIdAndDelete({
            _id: new mongoose.Types.ObjectId(user.additionalDetails),
        })
        for(const courseId of user.courses) {
            await Course.findByIdAndDelete(
                courseId,
                { $pull: {studentEnrolled: id} },
                { new: true }
            )
        }

        // TODO: HW--> Unenroll user from all enrolled Course(PENDING)
        
        // delete User
        await User.findByIdAndDelete({_id:id})

        // Return Response
        return res.status(200).json({
            success: true,
            message: "Account deleted Successfully",  
        })
        await CourseProgress.deleteMany({ userId: id })
        
    }catch(error) {
        return res.status(500).json({
            success: false,
            message: "Unable to delete account, Please Try Again",
            error:error.message,
        });
    }
}

// GET ALL USER DETAILS HANDLER FUNCTION
exports.getAllUserDetails = async (req, res) => {
    try{

        // get id
        const id = req.user.id;

        // validation and get user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        console.log(userDetails);

        // return response
        return res.status(200).json({
            success: true,
            message: "User Data Fetched Successfully",
            data: userDetails,
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// Update Display Picture
exports.updateDisplayPictue = async (req, res) => {
    try{

        // get userID
        const userId = req.user.id;

        // get displayPicture
        const displayPicture = req.files.displayPicture;

        // upload picture to cloudinary
        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        );
        console.log(image)

        // update profile
        const updateProfile = await User.findByIdAndUpdate(
            {_id: userId},
            {image: image.secure_url},
            {new: true}
        )
        // return res
        return res.send({
            success: true,
            message: "Image Update Successfully",
            data: updateProfile,
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
          })
    }
}

// GET ENROLLED COURSES [PENDING]
exports.getEnrolledCourse = async (req, res) => {
    try{

        // GET USER ID
        const userId = req.user.id;

        // GET ALL COURSE WITH THIS ID
        let userDetails = await User.findOne({
            _id: userId,
        }).populate({
            path: "courses",
            populate: {
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            },
        }).exec()

        //convert userDetails to object
         userDetails = userDetails.toObject()

        // initialize subsection length with zero
        var SubsectionLength = 0

        for(var i = 0; i < userDetails.courses.length; i++){
            let totalDurationInSeconds = 0
            SubsectionLength = 0

            for(var j = 0; j < userDetails.courses[i].courseContent.length; j++){
                totalDurationInSeconds += userDetails.courses[i].courseContent[j].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)

                userDetails.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds)

                SubsectionLength += userDetails.courses[i].courseContent[j].subSection.length
            }
            let courseProgressCount = await CourseProgress.findOne({
                courseID: userDetails.courses[i]._id,
                userId: userId,
            })

            courseProgressCount = courseProgressCount?.completedVideos.length

            if(SubsectionLength === 0){
                userDetails.courses[i].progressPercentage = 100
            } else {
                const multiplier = Math.pow(10, 2)
                userDetails.courses[i].progressPercentage = Math.round((courseProgressCount / SubsectionLength) * 100 * multiplier) / multiplier
            }
        }

        // VALIDATION
        if(!userDetails){
            return res.status(400).json({
                success: false,
                message: `Could Not find user with id ${userDetails}`,
            })
        }

        // RETURN RESPONSE
        return res.status(200).json({
            success: true,
            data: userDetails.courses,
          })

    } catch(error) {
        return res.status(500).json({
            success: false,
            message: error.message,
          })
    }
}

// INSTRUCTOR DASHBOARD
exports.instructorDashboard = async(req, res) => {
    try{
        const courseDetails = await Course.find({
            instructor: req.user.id
        })

        const courseData = courseDetails.map((course) => {
            const totalStudentsEnrolled = course.studentEnrolled.length
            const totalAmountGenarated = totalStudentsEnrolled * course.price

            // create a new object with additional fields
            const courseDataWithStats = {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                totalStudentsEnrolled,
                totalAmountGenarated,
            }
            return courseDataWithStats
        })

        // return response
        res.status(200).json({
            courses: courseData
        })
    } catch(error){
        console.error(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}