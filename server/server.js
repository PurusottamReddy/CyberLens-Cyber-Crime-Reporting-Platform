
import dotenv from "dotenv";
dotenv.config();


import express from "express"
import connectDB from "./configs/db.js";
import {connectCloudinary} from "./configs/cloudinary.js"
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./routes/userRoutes.js"
import crimeRouter from "./routes/crimeRoutes.js"

const app = express()
const PORT=process.env.BACKEND_PORT ||8000;

await connectDB();
await connectCloudinary();


const allowedOrigins = ['http://localhost:5173', 'http://localhost:5000', process.env.FRONTEND_URL]

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:allowedOrigins,
    credentials:true
}))
app.use(express.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    res.send(`Api working`)
})

app.use("/api/user",userRouter)
app.use("/api/crime",crimeRouter)


app.listen(PORT,()=>{
    console.log(`server is running on PORT ${PORT}`)
})

