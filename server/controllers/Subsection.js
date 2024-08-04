const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createSubSection = async(req,res) => {
    try{

        // Fetch data
        const {sectionId, title, description} = req.body;

        // extract file/video
        const video = req.files.video;

        // validation
        if(!sectionId || !title || !description || !video){
            return res.status(404).json({
                success: false,
                message: "All fields are required",
            })
        }
        console.log(video)

        // upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        // Create a sub-section
        const SubSectionDetails = await SubSection.create({
            title: title,
            timeDuration: `${uploadDetails.duration}`,
            description: description,
            videoUrl: uploadDetails.secure_url,
        });

        // update Section with this subsection object id
        const updateSection = await Section.findByIdAndUpdate(
            {_id: sectionId},
            {
                $push: {
                    subSection: SubSectionDetails._id,
                }
            },
            {new: true}
        ).populate("subSection");
        // HW(DONE):: log update section here, after adding populate queary

        //return response
        return res.status(200).json({
            success: true,
            message: "Sub-Section Created Successfully",
            data: updateSection,
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Unable to create sub-section, Please Try Again",
            error:error.message,
        });
    }
}

///// HOME WORK [CHECK LATER] /////
// UPDATE SUB_SECTION HANDLER
exports.updateSubsection = async(req,res) => {
    try{

        // Fetch Data
        const {sectionId, subSectionId, title, description} = req.body;

        // Find Subsection using spacified sub-section Id
        const subSection = await SubSection.findById(subSectionId);

        //check subsection validation
        if(!subSection){
            return res.status(404).json({
                success: false,
                message: "SubSection not found",
            })
        }

        // update the title and description in subsection
        if(title !== undefined){
            subSection.title = title
        }
        if(description !== undefined){
            subSection.description = description
        }

        //check if the video is present then upload the video to cloudinary
        if(req.files && req.files.video !== undefined){
            const video = req.files.video
            const uploadDetails = await uploadImageToCloudinary(
                video,
                process.env.FOLDER_NAME
            )
            subSection.videoUrl = uploadDetails.secure_url
            subSection.timeDuration = `${uploadDetails.duration}`
        }

        await subSection.save()

         // find the data of updated section
        const updatedSection = await Section.findById(sectionId).populate("subSection")
        
        // return response
        return res.status(200).json({
            success: true,
            data: updatedSection,
            message: "Sub-Section Updated Successfully",
        })

    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Unable to update sub-section, Please Try Again",
            error:error.message,
        });
    }
}


// DELETE SUB_SECTION HANDLER FUNCTION
exports.deleteSubsection = async(req, res) => {
    try{

        //get Id
        const {sectionId, subSectionId} = req.body;

        // Update Corresponding Section by Pulling spacified subSection
        await Section.findByIdAndUpdate(
            {_id: sectionId},
            {
                $pull: {
                    subSection: subSectionId,
                },
            }
        )

        //use FindByIdAndDelete
        const subSection =  await SubSection.findByIdAndDelete({_id: subSectionId});
        
        // check subSection Validation
        if(!subSection){
            return res.status(404).json({
                success: false,
                message: "SubSection not found", 
            })
        }

        // find the data of updated section
        const updatedSection = await Section.findById(sectionId).populate("subSection")

        //retun response
        return res.status(200).json({
            success: true,
            data: updatedSection,
            message: "Sub-Section Deleted Successfully"
        })

    }catch(error){
        console.error(error)
        return res.status(500).json({
            success: false,
            message: "Unable to delete sub-section, Please Try Again",
            error:error.message,
        });
    }
}