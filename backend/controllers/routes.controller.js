import  db  from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { insertRoute,getRouteBySandD } from "../models/route.model.js";


export const insertNewRoute = async (req, res) => {
    const routeData = req.body;
    try {
        const { source_code,destination_code,duration } = routeData;
        if (!source_code || !destination_code || !duration ) {
            return res.status(400).send("Missing required parameters");
        }

        // Check if user already exists
        const result = await getRouteBySandD(source_code, destination_code);
        if (result !== null) {
            console.log("Route already exists:", result);
            return res.status(400).json("Route already exists");
        }

        
        const values = [source_code, destination_code, duration];

        // Insert new user into the database
        try {
            const addRoute = await insertRoute(...values);
            return res.status(200).json({
                message: "Route added successfully",
            });
        } catch (err) {
            console.error("Error adding route:", err);
            return res.status(500).json({ error: "Failed to add route", message: err.message });
        }

    } catch (error) {
        console.error("route adding error:", error);
        res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
};


// module.exports = router;






