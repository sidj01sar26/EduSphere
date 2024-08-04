const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection")

exports.createSection = async (req, res) => {
    try{

        // Data fetch
        const {sectionName, courseId} = req.body;

        // Data Validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success: false,
                message: "Missing Property",
            })
        }

        // Create Section
        const newSection = await Section.create({sectionName})

        // Update Course with Section objectID
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {
                    courseContent: newSection._id,
                }
            },
            {new:true},
        ).populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            },
        }).exec();
        // HW(DONE): use POPULATE to replace section/sub-sections both in the updatedCourseDetails

        // Return Response
        res.status(200).json({
            success: true,
            message: "Section Created Successfully",
            updatedCourseDetails,
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Unable to create section, Please Try Again",
            error:error.message,
        });
    }
}

// UPDATE SECTION HANDLER FUNCTION
exports.updateSection = async(req, res) => {
    try{

        // Fetch Data
        const {sectionName, sectionId, courseId} = req.body;

        // Data Validation
        if(!sectionName || !sectionId || !courseId){
            return res.status(400).json({
                success: false,
                message: "Missing Property",
            })
        }

        // Update data
        const section = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true});

        // Find the course and get the all details about its content 
        const course = await Course.findById(courseId)
        .populate({
            path: "courseContent",
            populate: {
                path: "subSection",
            },
        }).exec();

        // Return response
        return res.status(200).json({
            success: true,
            message: section,
            data: course,
        })

    }catch(error){
		console.error("Error updating section:", error);
        return res.status(500).json({
            success: false,
            message: "Unable to update section, Please Try Again",
        });
    }
}

// DELETE SECTION HANDLER FUNCTION
exports.deleteSection = async (req, res) => {
    try{

        // Get Id- assuming that we are sending id in Params
        const {sectionId, courseId} = req.body;

        // Update the course and remove sectionId from course content
        await Course.findByIdAndUpdate(courseId, {
            $pull: {
                courseContent: sectionId,
            }
        })

        // Find the section
        const section = await Section.findById(sectionId);
        console.log(sectionId, courseId);

        // Error handleing if section not found
        if(!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
            })
        }

        // Delete Sub-section
        await SubSection.deleteMany({
            _id: {
                $in: section.subSection
            }
        })
        await Section.findByIdAndDelete(sectionId);

        // Find the updated course and return
        const course = await Course.findById(courseId).populate({
            path: "courseContent",
            populate: {
                path: "subSection"
            }
        }).exec();

        // return response
        res.status(200).json({
            success: true,
            message: "Section Deleted Successfully",
            data: course,
        })

    }catch(error){
		console.error("Error deleting section:", error);
        res.status(500).json({
            success: false,
            message: "Unable to delete section, Please Try Again",
        });
    }
}