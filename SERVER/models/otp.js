const mongoose=require("mongoose");

const OTPSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        default:Date.now()
    },
    createdAt:{
        type:String,
        default:Date.now,
        expires:5*60,
    }
});

//a function -> to send emails
async function sendVerification(email,otp){
    try{
        const mailResponse=await mailSender(email,"Verification Email",otp);
        console.log("Email Sent Successfully",mailResponse);
    }catch(error){
        console.log("error occured while sending emails",error);
        throw error;
    }

    OTPSchema.pre("save",async function(next){
        await sendVerification(this.email,this.otp);
        next();
    });
}


module.exports=mongoose.model("OTP",OTPSchema)