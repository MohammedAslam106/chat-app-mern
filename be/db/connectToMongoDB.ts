import mongoose from "mongoose";


const connectToMongoDB= async ()=>{
    // console.log('DB_URL',process.env.DB_URL)
    try {
        await mongoose.connect(process.env.DB_URL!);
        console.log('Connected to MongoDB');
    } catch (error:any) {
        console.log('Error connecting to MongoDB',error.message)
    }
}

export default connectToMongoDB