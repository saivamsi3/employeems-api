import mongoose from "mongoose";

export const connectDB = async() => {
    try{
        // console.log(process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongodb connected successfully..`);

    }catch(err){
        console.log(`MongoDb connection failure: ${err}`);
        process.exit(1);
    }
}