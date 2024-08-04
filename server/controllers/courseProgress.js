const CourseProgress = require("../models/CourseProgress");
const SubSection = require("../models/SubSection");


exports.updateCourseProgress = async(req, res) => {
    const {courseId, subSectionId} = req.body;
    const userId = req.user.id;

    try{
        // Find SubSection with spacified id
        const subSection = await SubSection.findById(subSectionId)
        // Check if the subsection is valid
        if(!subSection){
            return res.status(404).json({
                error: "Invalid SubSection"
            })
        }

        // Find the course progress document for the user and course
        let courseProgress = await CourseProgress.findOne({
            courseID: courseId,
            userId: userId,
        })

        // If course progress exist or not
        if(!courseProgress){
            // if not exist the return false
            return res.status(404).json({
                success: false,
                message: "Course progress Does Not Exist",
            })
        } else {
            // If course progress exists, check if the subsection is already completed
            if(courseProgress.completedVideos.includes(subSectionId)){
                return res.status(400).json({ 
                    error: "Subsection already completed" 
                })
            }

            // Push the subsection into the completedVideos array
            courseProgress.completedVideos.push(subSectionId)
        }

        // save courseProgress in DB
        await courseProgress.save()

        // return response
        return res.status(200).json({
            message: "Course progress updated",
        })
    } catch(error) {
        console.error(error)
        return res.status(400).json({ 
            error: "Internal server error" 
        })
    }
}