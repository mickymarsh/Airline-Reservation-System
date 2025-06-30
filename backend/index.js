import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

import loginRoutes from "./routes/login.js"
import registerRoutes from "./routes/register.js"
import searchRoutes from "./routes/search.js"
import seatRoutes from "./routes/seat.js"
import reserveRoutes from "./routes/reserve.js"


app.use(express.json())
app.use(cors(
    {origin: "http://localhost:3000",
        credentials: true,
    }
))
app.use(cookieParser())

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