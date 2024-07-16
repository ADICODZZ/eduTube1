const express =  require("express");
const app=express();

const userRoutes=require("./routes/User");
const profileRoutes=require("./routes/Profile");
const paymentRoutes=require("./routes/Payments");
const courseRoutes=require("./routes/Course");

const fileUpload=require("express-fileupload");
const database=require("./config/database");
const cookieParser = require("cookie-parser");
const cors=require("cors");

const { cloudinaryconnect }=require("./config/cloudinary");
const dotenv=require("dotenv");

dotenv.config();
const PORT=process.env.PORT||4000;

//database connection
database.connect();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"https://edu-tube1.vercel.app",
        Credential:true,
    })
)

app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
)

//cloudinary connection
cloudinaryconnect();

///routes
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/course",courseRoutes);

//def routes
app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Welcome to EduTube Server"
    })
})

app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`)
})
