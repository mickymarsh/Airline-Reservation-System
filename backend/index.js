import express from "express";

const app = express();

import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import statisticRoutes from "./routes/statistics.route.js";



//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use("/backend/user", userRoutes);
app.use("/backend/admin", adminRoutes);
app.use("/backend/statistics", statisticRoutes);



// app.use("/api/Login", loginRoutes)
// app.use("/api", registerRoutes)
// app.use("/api", searchRoutes)


app.get("/", (req, res) => {
    res.send("Welcome to the API!");
});



app.listen(4000, ()=>{
    console.log("Connected to BackEnd!")
})

