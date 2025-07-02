import db from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { insertAircraft, getAircraftByModelBrand } from "../models/aircraft.model.js";


export const insertNewAircraft = async (req, res) => {
    const aircraftData = req.body;
    try {
        const { brand,model, last_service_date, purchase_date, manufactured_date } = aircraftData;
        if (!model || !brand || !last_service_date || !purchase_date || !manufactured_date) {
            return res.status(400).send("Missing required parameters");
        }

        // Check if user already exists
        const result = await getAircraftByModelBrand(model, brand);
        if (result !== null) {
            console.log("Aircraft already exists:", result);
            return res.status(400).json("Aircraft already exists");
        }


        const values = [
            brand,
            model,
            last_service_date,
            purchase_date,
            manufactured_date
        ];

        // Insert new user into the database
        try {
            const addNewAircraft = await insertAircraft(...values);
            return res.status(200).json({
                message: "Aircraft added successfully",
            });
        } catch (err) {
            console.error("Error adding aircraft:", err);
            return res.status(500).json({ error: "Failed to add aircraft", message: err.message });
        }

    } catch (error) {
        console.error("aircraft adding error:", error);
        res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
};


// module.exports = router;






