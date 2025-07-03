import db from "../connect.js";
import { getFlightEconomyClassCount, getFlightBusinessClassCount, getFlightPlatinumClassCount } from "../models/schedule.model.js";

export const getFlightClassDetails = async (req, res) => {
    try {
        // Get flight number from request body
        const { flight_number } = req.body;
        
        if (!flight_number) {
            return res.status(400).json({ 
                success: false, 
                message: "Flight number is required" 
            });
        }

        const economy_class_seats = await getFlightEconomyClassCount(flight_number);
        const business_class_seats = await getFlightBusinessClassCount(flight_number);
        const platinum_class_seats = await getFlightPlatinumClassCount(flight_number);

        // Return class count details in order: economy, business, platinum
        res.status(200).json({
            success: true,
            flight_number: flight_number,
            class_details: {
                economy_class_seats: economy_class_seats,
                business_class_seats: business_class_seats,
                platinum_class_seats: platinum_class_seats
            }
        });

    } catch (error) {
        console.error("Error fetching flight details:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error", 
            error: error.message 
        });
    }
}
