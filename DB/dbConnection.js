import { fail } from "assert";
import { error } from "console";
import mongoose from "mongoose";
export const connectDB=async()=>{
    return await mongoose
    .connect(process.env.urlConnection)
    .catch((error)=>(console.log("database connection fail",error)))
}