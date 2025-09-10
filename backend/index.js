import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app=express();
app.use(express.json());
app.use(cors());

const connectDB=async()=>{
    try{
    const conn=await mongoose.connect(process.env.MONGODB_URL);

    if(conn){
        console.log("MongoDB connected");
    }
}    catch(err){
    console.error(err.message);
}
}
 
app.get('/',(req,res)=>{
    res.json({status:"Ok" , message:"Server is healthy" });
});

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
});
