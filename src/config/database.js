import mongoose from "mongoose";


export async function connectDb() {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        
        console.log("MongoDB connected successfully...!");
    } catch (error) {
        console.error("MongoDb connected failed..!!!", error.message);
      
        process.exit(1);
    }
}