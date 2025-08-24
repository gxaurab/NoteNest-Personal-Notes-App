import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

interface ConnectionString{
  URL: string | undefined
}

const URL = process.env.CONNECTION_STRING

if(!URL){
  throw new Error("Missing Connection string in the env file")
}

export const connectDB=async()=>{
  await mongoose.connect(URL)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => {
    console.error("DB connection failed: ✅", err);
  });
}




