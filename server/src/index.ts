import express from "express";
import authRoutes from "./routes/auth"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cors from "cors"

import userRoutes from "./routes/user"
import patientRoutes from "./routes/patient"

dotenv.config()

mongoose.connect(
    process.env.MONGO_URI as string
)
.then(() => {  
    console.log("Connected to mongoDB")
    
    const app = express();
    app.use(express.json())
    app.use(cors())//TODO:specify client that can connect
    app.use("/auth", authRoutes)
    app.use("/user", userRoutes)
    app.use("/patient", patientRoutes)

    app.listen(8080, () => {
        console.log('Now listening to port 8080')
    })
})
.catch((error) => {  
    console.log({error})
    throw new Error(error)
})