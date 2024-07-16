const Category=require("../models/Category");
const Course = require("../models/Course");
//create Tag handler function
exports.createCategory=async(req,res)=>{
    try{
        //fetch data from body
        const {name,description}=req.body;

        //validation
        if(!name || !description){    
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            });
        }

        //create entry in DB
        const CategoryDetails=await Category.create({
            name:name,
            description:description,
        });

        console.log(CategoryDetails);
        //return response
        return res.status(201).json({
            success:true,
            message:"Tag created successfully",
            data:CategoryDetails
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });

    }
}

//get all tags
exports.showAllCategories=async(req,res)=>{
    try{
        const allCategories=await Category.find({},{name:true,description:true});
        
        return res.status(200).json({
            success:true,
            data:allCategories,
        });

    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        });
    }
}

//categoryPageDetails

exports.categoryPageDetails=async(req,res)=>{

    try{
        //get categoryId
        const {categoryId}=req.body;
        
        console.log("category id",categoryId);

        //get courses for specified categoryId
        const selectedCategory = await Category.findById(categoryId)
                                                .populate("courses")
                                                .exec();

        console.log("selected category is",selectedCategory);

        //validation
        if(!selectedCategory){
            return res.status(400).json({
                success:false,
                message:"Data Not Found",
            });
        }

        // Handle the case when there are no courses
        if (selectedCategory.courses.length === 0) {
			console.log("No courses found for the selected category.");
			return res.status(404).json({
				success: false,
				message: "No courses found for the selected category.",
			});
		}


        // Get courses for other categories
		const categoriesExceptSelected = await Category.find({ _id: { $ne: categoryId } })
    .populate({
        path: "courses",
        match: { status: "Published" },
        populate: [
            { path: "instructor" },
            { path: "RatingAndReviews" }
        ]
    });
		let differentCourses = [];
        console.log("categoriesExceptSelected",categoriesExceptSelected);
        //console.log("categoriesExceptSelected",categoriesExceptSelected);
		for (const category of categoriesExceptSelected) {
			differentCourses.push(...category.courses);
            console.log("different courses",category.courses);
		}
        
        //get top selling courses across all categories
        const allCategories = await Category.find().populate({path:"courses",match:{status:"Published"},populate:([{path:"instructor"},
            {path:"RatingAndReviews"}])});
		const allCourses = allCategories.flatMap((category) => category.courses);
        console.log("all courses",allCourses);
		const mostSellingCourses = allCourses
			.sort((a, b) => b.sold - a.sold)
			.slice(0, 10);

        //return response
        return res.status(200).json({
            success:true,
            data:{
                selectedCourses:selectedCategory.courses,
                differentCourses:differentCourses,
                mostSellingCourses:mostSellingCourses,
            },
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message
        });

    }

};

//add course to Category
exports.addCourseToCategory = async (req, res) => {
	const { courseId, categoryId } = req.body;
	console.log("category id", categoryId);
	try {
		const category = await Category.findById(categoryId);
        console.log("CATEGORY IS",category);
		if (!category) {
			return res.status(404).json({
				success: false,
				message: "Category not found",
			});
		}
		const course = await Course.findById(courseId);
		if (!course) {
			return res.status(404).json({
				success: false,
				message: "Course not found",
			});
		}
		if(category.courses.includes(courseId)){
			return res.status(200).json({
				success: true,
				message: "Course already exists in the category",
			});
		}
		category.courses.push(courseId);
		await category.save();
		return res.status(200).json({
			success: true,
			message: "Course added to category successfully",
		});
	}
	catch (error) {
		return res.status(500).json({
			success: false,
			message: "Internal server error",
			error: error.message,
		});
	}
}