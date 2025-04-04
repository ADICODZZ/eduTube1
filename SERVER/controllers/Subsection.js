const Subsection = require("../models/SubSection");
const Section=require("../models/Section");
//const { findByIdAndUpdate } = require("../models/User");
const {uploadImageToCloudinary} =require("../utils/ImageUploaderToCloudinary");

//create Section

exports.createSubSection = async (req, res) => {
    try {
        // Fetch data from req body
        const { sectionId, timeDuration, title, description } = req.body;
        const video=req.files.videoFile;
        console.log("Received request to create subsection");

        // Validation
        if (!sectionId  || !title || !description) {
            return res.status(400).json({
                success: false,
                message: "Validation failed. Please provide all required fields.",
            });
        }

        console.log("Validation passed");

        // Upload video to cloudinary (commented out as not used)
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);

        console.log(uploadDetails,"video uploaded to cloudinary");
        // Create a subsection
        const subSectionDetails = await Subsection.create({
            title: title,
            timeDuration: timeDuration,
            description: description,
            videoUrl: uploadDetails.secure_url, // Uncomment if video upload is implemented
        });

        console.log("Subsection created", subSectionDetails);

        // Update section with this subsection ObjectId
        const updateSection = await Section.findByIdAndUpdate(
            sectionId, // Pass the sectionId directly
            { $push: { subSection: subSectionDetails._id } },
            { new: true }
        ).populate('subSection'); // Optional: populate to get detailed subsection info

        console.log("Updated section with new subsection", updateSection);

        // Return response
        res.status(200).json({
            success: true,
            message: "Subsection created successfully",
            updateSection,
        });
    } catch (error) {
        console.log("Error in creating subsection:", error.message);
        return res.status(500).json({
            success: false,
            message: "Subsection creation unsuccessful. Please try again later.",
            error: error.message,
        });
    }
};


// UPDATE a sub-section
exports.updateSubSection = async (req,res) => {

	try {
		// Extract necessary information from the request body
		const { SubsectionId, title , description,courseId } = req.body;
		const video = req?.files?.videoFile;

		
		let uploadDetails = null;
		// Upload the video file to Cloudinary
		if(video){
		 uploadDetails = await uploadImageToCloudinary(
			video,
			process.env.FOLDER_VIDEO
		);
		}

		// Create a new sub-section with the necessary information
		const SubSectionDetails = await Subsection.findByIdAndUpdate({_id:SubsectionId},{
			title: title || Subsection.title,
			// timeDuration: timeDuration,
			description: description || Subsection.description,
			videoUrl: uploadDetails?.secure_url || Subsection.videoUrl,
		},{ new: true });

		
		const updatedCourse = await Course.findById(courseId).populate({ path: "courseContent", populate: { path: "subSection" } }).exec();
		// Return the updated section in the response
		return res.status(200).json({ success: true, data: updatedCourse });
	} catch (error) {
		// Handle any errors that may occur during the process
		console.error("Error creating new sub-section:", error);
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}

}


exports.deleteSubSection = async(req, res) => {

	try {
		const {subSectionId,courseId} = req.body;
		const sectionId=req.body.sectionId;
	if(!subSectionId || !sectionId){
		return res.status(404).json({
            success: false,
            message: "all fields are required",
        });
	}
	const ifsubSection = await SubSection.findById({_id:subSectionId});
	const ifsection= await Section.findById({_id:sectionId});
	if(!ifsubSection){
		return res.status(404).json({
            success: false,
            message: "Sub-section not found",
        });
	}
	if(!ifsection){
		return res.status(404).json({
            success: false,
            message: "Section not found",
        });
    }
	await SubSection.findByIdAndDelete(subSectionId);
	await Section.findByIdAndUpdate({_id:sectionId},{$pull:{subSection:subSectionId}},{new:true});
	const updatedCourse = await Course.findById(courseId).populate({ path: "courseContent", populate: { path: "subSection" } }).exec();
	return res.status(200).json({ success: true, message: "Sub-section deleted", data: updatedCourse });
		
	} catch (error) {
		// Handle any errors that may occur during the process
        console.error("Error deleting sub-section:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        });
		
	}
};