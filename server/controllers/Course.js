const Course = require("../models/Course");
const User = require("../models/User");
const Category = require("../models/Category");
const {uploadImageToCloudinary} = require("../utils/imageUploader");
const CourseProgress = require("../models/CourseProgress");
const { convertSecondsToDuration } = require("../utils/secToDuration");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");

// cerateCourse Handler function
exports.createCourse = async (req, res) => {
    try{
        
        // Get user ID from request object
        const userId = req.user.id;

       // Fetch Data
       let {
        courseName, 
        courseDescription, 
        whatYouWillLearn, 
        price, 
        tag: _tag, 
        category, 
        status, 
        instructions: _instructions,
    } = req.body;

       // Fetch thumbnail
       const thumbnail = req.files.thumbnailImage;

      // Convert the tag and instructions from stringified Array to Array

      const tag = JSON.parse(_tag)
      const instructions = JSON.parse(_instructions)

      console.log("tag", tag)
      console.log("instructions", instructions)


       // Validation
       if(!courseName || 
        !courseDescription || 
        !whatYouWillLearn || 
        !price || 
        !category ||
        !tag.length || 
        !thumbnail ||
        !instructions.length
        ){
        return res.status(400).json({
            success: false,
            message: "All Fields Are required",
        })
       }

       if(!status || status === undefined) {
        status = "Draft";
       }

       const instructorDetails = await User.findById(userId, { accountType: "Instructor", });
       console.log("Instructor Details: ", instructorDetails);
       // TODO: Verify that userId and InstructorDetails._id are same or details

       if(!instructorDetails) {
        return res.status(404).json({
            success: false,
            message: "Instructor details not found",
        });
       }

       // category Validation
       // TODO: HOMEWORK (CHECK MY CODE)
       const categoryDetails = await Category.findById(category);
       if(!categoryDetails){
        return res.status(404).json({
            success: false,
            message: "category details not found",
        });
       }

       // Image upload to cloudinary
       const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);
		console.log(thumbnailImage);

       // create new course entry
       const newCourse = await Course.create({
        courseName,
        courseDescription,
        instructor: instructorDetails._id,
        whatYouWillLearn: whatYouWillLearn,
        category: categoryDetails._id,
        tag,
        price,
        thumbnail: thumbnailImage.secure_url,
        status: status,
		instructions,
       });

       // Add the new course to the users schema of instructor
       await User.findByIdAndUpdate(
        {_id: instructorDetails._id,},
        {
            $push: {
                courses: newCourse._id,
            },
        },
        {new:true},
       );

       // update category schema
       // TODO:: CHECK LATER
       const categoryDetails2 = await Category.findByIdAndUpdate(
        {_id: category},
        {
            $push: {
                courses : newCourse._id,
            },
        },
        {new: true},
       );

       // Return Response
       return res.status(200).json({
            success: true,
            message: "Course Created successfully",
            data: newCourse,
        })

    }catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create course",
            error:error.message,
        });
    }
}

// editCourse Handler function
exports.editCourse = async(req, res) => {
    try{

        // fetch courseId and updates from req body
        const {courseId} = req.body;
        const updates = req.body;

        // find the course and validate
        const course = await Course.findById(courseId)

        if(!course){
            return res.status(404).json({
                error: "Course not found"
            })
        }

        // if thumbnail is found then update it
        if(req.files){
            console.log("Thubnail update")
            const thumbnail = req.files.thumbnailImage
            const thumbnailImage = await uploadImageToCloudinary(
                thumbnail,
                process.env.FOLDER_NAME
            )
            course.thumbnail = thumbnailImage.secure_url
        }

        // Update only the fields that are present in the request body
        for(const key in updates){
            if(updates.hasOwnProperty(key)){
                if(key === "tag" || key ==="instructions"){
                    course[key] = JSON.parse(updates[key])
                } else{
                    course[key] = updates[key]
                }
            }
        }
        await course.save()

        // fetch the updated course with additional details and populate the related field
        const updatedCourse = await Course.findOne({
            _id: courseId,
        }).populate({
            path: "instructor",
            populate: {
                path: "additionalDetails",
            },
        }).populate("category")
        .populate("ratingAndReviews")
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        }).exec()

        // return response and pass updatedCourse data
        res.json({
            success: true,
            message: "Course Created Successfully",
            data: updatedCourse,
        })

    } catch(error){
        res.status(500).json({
            success: false,
            message: "Internal server Error",
            error: error.message,
        })
    }
}

// getFullCourseDetails handler function
exports.getFullCourseDetails = async(req,res) => {
    try{

        //fetch course id from req body and fetch user id from req user id
        const {courseId} = req.body
        const userId = req.user.id

        // find course with spacific course id and populate the various field
        const courseDetails = await Course.findOne({
            _id: courseId,
        }).populate({
            path: "instructor",
            populate: {
                path: "additionalDetails",
            },
        }).populate("category")
        .populate("ratingAndReviews")
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        }).exec()

        // find course progress count using spacified courseId and userId
        let courseProgressCount = await CourseProgress.findOne({
            courseID: courseId,
            userId: userId,
        })
        console.log("courseProgressCount : ", courseProgressCount)

        // validate Course Details
        if(!courseDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find course with id: ${courseId}`,
            })
        }

        // Calculate total duration of the course
        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
            })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

        // return response
        return res.status(200).json({
            success: true,
            data: {
                courseDetails,
                totalDuration,
                completedVideos: courseProgressCount?.completedVideos ? courseProgressCount?.completedVideos : [],
            },
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

// getAllCourse Handler Function 
exports.showAllCourses = async (req, res) => {
    try{

        const allCourses = await Course.find(
            { status: "Published" }, 
            {courseName:true,
            price: true,
            thumbnail: true,
            instructor: true,
            ratingAndReviews: true,
            studentEnrolled: true,})
            .populate("instructor")
            .exec();

        return res.status(200).json({
            success: true,
            message: "Data for all courses fetch successfull ",
            data:allCourses,
        });       

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Cannot fetch course Data",
            error:error.message,
        });
    }
}

// getCourseDetails Handler function
exports.getCourseDetails = async (req, res) => {
    try{

        // get ID
        const {courseId} = req.body;

        // Find course details
        const courseDetails = await Course.findOne({
            _id: courseId,
        })
            .populate({
              path: "instructor",
              populate: {
              path: "additionalDetails",
              },
            })
            .populate("category")
            .populate("ratingAndReviews")
            .populate({
              path: "courseContent",
              populate: {
                path: "subSection",
                select: "-videoUrl",
              },
            })
            .exec();
        
        // validation
        if(!courseDetails){
            return res.status(400).json({
                success: false,
                message: `could not find the course with ${courseId}`
            })
        }

        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
            content.subSection.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
            })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

        // Return Response
        return res.status(200).json({
            success: true,
            message: "course details fetched successfully",
            data: {
                courseDetails,
                totalDuration,
            }
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    } 
}

// getInstructorCourse Handler Function (get a list of course for a given instructor)
exports.getInstructorCourse = async (req, res) => {
    try{
        // fetch instructor id from request body
        const instructorId = req.user.id;

        // find all courses under specific instructor and sort in descending order
        const instructorCourses = await Course.find({
            instructor: instructorId,
        }).sort({ createdAt: -1 })

        // retuen response
        res.status(200).json({
            success: true,
            data: instructorCourses,
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed to retrive Instructor Course",
            error: error.message,
        })
    }
}

// Delete Courses Handler Function
exports.deleteCourse = async (req, res) => {
    try{

        // get course id from req body
        const {courseId} = req.body;

        // find the course
        const course = await Course.findById(courseId)

        // check if there is any course present or not
        if(!course){
            return res.status(404).json({
                message: "Course not found",
            })
        }

        // Unenrolled student from the courses
        const studentsEnrolled = course.studentEnrolled

        for(const studentId of studentsEnrolled){
            await User.findByIdAndUpdate(studentId, {
                $pull: {courses: courseId},
            })
        }

        // delete sections and Sub sections
        const courseSections = course.courseContent
        for (const sectionId of courseSections) {
            const section = await Section.findById(sectionId)
            if(section){
                const subSections = section.subSection
                for(const subSectionId of subSections) {
                    await SubSection.findByIdAndDelete(subSectionId)
                }
            }
            await Section.findByIdAndDelete(sectionId)
        }

        // Delete the course
        await Course.findByIdAndDelete(courseId)

        // Return Response
        return res.status(200).json({
            success: true,
            message: "Course Deleted Successfully",
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        })
    }
}