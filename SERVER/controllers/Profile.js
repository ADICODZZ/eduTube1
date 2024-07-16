const Profile=require("../models/Profile");
const User=require("../models/User");
const Course = require("../models/Course");
const { uploadImageToCloudinary } = require("../utils/ImageUploaderToCloudinary");
exports.updateProfile=async(req,res)=>{
    try{
        //fetch data
        const {dateOfBirth="",about="",contactNumber,gender}=req.body;
        //get userId
        const id=req.user.id;
        //validation
        if(!id  ){
            return res.status(400).json({
                success:false,
                message:"All fields are Requuired",
            });
        }
        //findProfile
        const userDetails=await User.findById(id);
        const profileId=userDetails.additionalDetails;
        const profileDetails=await Profile.findById(profileId);

        //update profile
        profileDetails.dateOfBirth=dateOfBirth;
        profileDetails.about=about;
        profileDetails.gender=gender;
        profileDetails.contactNumber=contactNumber;
        await profileDetails.save();

        //return response
        return res.status(200).json({
            success:true,
            message:"Proofile Updated Successfully",
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            error:error.message,
        })

    }
}

//delete Account

exports.deleteAccount=async (req,res)=>{
    try{
        //get id
        const id=req.user.id;
        //validation
        const userDetails=await User.findById(id);
        //delete profile
        await User.findByIdAndDelete({_id:userDetails.additionalDetails});
        //TODO: HW unenroll user form all enrolled courses
        //delete user
        await User.findByIdAndDelete({id:_id});

        //return response
        return res.status(200).json({
            success:true,
            message:"user Deleted Successfully",
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            error:error.message,
        });

    }
}

exports.getAllUserDetails=async(req,res)=>{
    try{
        //get id
        //console.log("hi");
         const id = req.user.id;

        console.log(id);
        //validation and get user details
        const userDetails=await User.findById(id).populate("additionalDetails").exec();

        console.log(userDetails);
        //return res
        return res.status(200).json({
            success:true,
            message:"user Data fetched Successfully",
            data:userDetails,
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            error:error.message,
        });
    }
}

exports.getEnrolledCourses=async (req,res) => {
	try {
        const id = req.user.id;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const enrolledCourses = await User.findById(id).populate({
			path : "courses",
				populate : {
					path: "courseContent",
			}
		}
		).populate("courseProgress").exec();
        // console.log(enrolledCourses);
        res.status(200).json({
            success: true,
            message: "User Data fetched successfully",
            data: enrolledCourses,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//updateDisplayPicture
exports.updateDisplayPicture = async (req, res) => {
	try {

	const id = req.user.id;
	   const user = await User.findById(id);
	if (!user) {
		return res.status(404).json({
            success: false,
            message: "User not found",
        });
	}
	const image = req.files.pfp;
    console.log(req.files)
	if (!image) {
		return res.status(404).json({
            success: false,
            message: "Image not found",
        });
    }
	const uploadDetails = await uploadImageToCloudinary(
		image,
		process.env.FOLDER_NAME
	);
	console.log(uploadDetails);
    console.log("hi");

	const updatedImage = await User.findByIdAndUpdate({_id:id},{image:uploadDetails.secure_url},{ new: true });

    console.log(updatedImage);
    res.status(200).json({
        success: true,
        message: "Image updated successfully",
        data: updatedImage,
    });
		
	} catch (error) {
		return res.status(500).json({
            success: false,
            message: error.message,
        });
		
	}



}

//instructor dashboard
exports.instructorDashboard = async (req, res) => {
	try {
		const id = req.user.id;
		const courseData = await Course.find({instructor:id});
		const courseDetails = courseData.map((course) => {
			totalStudents = course?.studentsEnrolled?.length;
			totalRevenue = course?.price * totalStudents;
			const courseStats = {
				_id: course._id,
				courseName: course.courseName,
				courseDescription: course.courseDescription,
				totalStudents,
				totalRevenue,
			};
			return courseStats;
		});
		res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: courseDetails,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message,
		});
	}
}