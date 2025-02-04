
import express from "express";

const app = express();

import userRoutes from "./routes/user.route.js";

import cors from "cors";
import cookieParser from "cookie-parser";


//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use("/backend/user", userRoutes);

app.listen(4000, () => {
    console.log("Backend server is running")
});


