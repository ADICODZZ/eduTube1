const mongoose = require("mongoose");
require("dotenv").config();

exports.connect=()=>{
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=> console.log("DB CONNECTION SUCCESSFULLY"))
    .catch( (error)=>{
        console.log("DB Connection Failed");
        console.error(error);
        process.exit(1);
    })
};