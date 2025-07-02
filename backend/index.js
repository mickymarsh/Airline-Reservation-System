

import express from "express";

const app = express();

import cors from "cors";
import cookieParser from "cookie-parser";



import userRoutes from "./routes/user.route.js";


import loginRoutes from "./routes/login.js"
import registerRoutes from "./routes/register.js"
import searchRoutes from "./routes/search.js"


//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use("/backend/user", userRoutes);



// app.use("/api/Login", loginRoutes)
// app.use("/api", registerRoutes)
// app.use("/api", searchRoutes)


app.get("/", (req, res) => {
    res.send("Welcome to the API!");
});



app.listen(4000, ()=>{
    console.log("Connected to BackEnd!")
})

