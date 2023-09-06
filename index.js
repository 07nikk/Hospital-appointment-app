import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import hospitalRouter from './routes/hospital.js';
import userRouter from './routes/users.js';
import authRouter from './routes/auth.js';
import cookieParser from 'cookie-parser';
dotenv.config();
const app = express();

//connect to DB
const connect = async()=>{
    try {
    await mongoose.connect(process.env.DB);
    console.log("MongoDB connected successfully!");
    } catch (error) {
        console.log("Error",error);
    }
}
mongoose.connection.on("disconnected",()=>{
    console.log("Mongo DB disconnected!");
});

//MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/auth',authRouter);
app.use('/api/v1/hospitals',hospitalRouter);
app.use('/api/v1/users', userRouter);

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success : "failed",
        status: errorStatus,
        message: errorMessage,
        stack : err.stack
    });
})


//App listening at port
const port = process.env.PORT || 8080;
app.listen(port, ()=>{
    connect();
    console.log(`Server running at port ${port}...`);
})