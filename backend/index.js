import express from "express";

const app = express();

import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/user.route.js";
import adminRoutes from "./routes/admin.route.js";
import statisticRoutes from "./routes/statistics.route.js";



import loginRoutes from "./routes/login.js"
import registerRoutes from "./routes/register.js"
import searchRoutes from "./routes/search.js"
import seatRoutes from "./routes/seat.js"
import reserveRoutes from "./routes/reserve.js"



//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// Chathu - Admin backend
app.use("/backend/user", userRoutes);
app.use("/backend/admin", adminRoutes);
app.use("/backend/statistics", statisticRoutes);



//Madhuni - User backend
app.use("/api/Login", loginRoutes)
app.use("/api", registerRoutes)
app.use("/api", searchRoutes)
app.use("/api", seatRoutes)
app.use("/api", reserveRoutes)




app.get("/", (req, res) => {
    res.send("Welcome to the API!");
});



app.listen(8800, ()=>{
    console.log("Connected to BackEnd!")
})

