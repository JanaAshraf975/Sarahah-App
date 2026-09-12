import mongoose from "mongoose";
import { DB_URL } from "../../config/config.service.js";

const connectDB=async()=>{
    try{
            await mongoose.connect(DB_URL,{serverSelectionTimeoutMS: 5000});
            console.log("Database Connected Successfully");
    }
    catch(err){
        conole.log("Database Connection Failed");
        console.log(err);
    }


}

export default connectDB;


