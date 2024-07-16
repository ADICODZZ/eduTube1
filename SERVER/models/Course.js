
const mongoose=require("mongoose");

const courseSchema=new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    courseName:{
        type:String,
    },
    courseDescription:{
        type:String,
    },
    instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    whatYouWilllearn:{
        type:String,
    },
    instructions:[
        {
        type:String,
     }
    ],
        

    courseContent:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Section",
        }
    ],
    RatingAndReviews:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"RatingAndReviews",
        }
    ],
    price:{
        type:Number,
    },
    thumbnail:{
        type:String,
    },
    tag:{
        type:String,
        ref:"Tag",
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,       
        ref:"Category",
    },
    status:{
        type:String,
        default:"Draft",
    },
    studentsEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User",
    }]
});

module.exports=mongoose.model("Course",courseSchema);
