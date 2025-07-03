import db from "../connect.js";
import { getFlightEconomyClassCount, getFlightBusinessClassCount, getFlightPlatinumClassCount,getPassengerChildIDs } from "../models/schedule.model.js";

export const getFlightClassDetails = async (req, res) => { 
    try {
        const flightNumber = req.user.flight_number; 

        const [economy_class_seats] = await getFlightEconomyClassCount(flightNumber);
        const [business_class_seats] = await getFlightBusinessClassCount(flightNumber);
        const [platinum_class_seats] = await getFlightPlatinumClassCount(flightNumber);
        
        
    } catch (error) {
        console.error("Error fetching flight details:", error);
        res.status(500).json({ message: "Server error", error });
    }
}


export const getChildPassengerIDs = async (req, res) => {
    try {
        // Get flight number from request body
        const { flight_number } = req.body;
        
        if (!flight_number) {
            return res.status(400).json({ 
                success: false, 
                message: "Flight number is required" 
            });
        }

        const children = await getPassengerChildIDs(flight_number);
        
        // Return only the data without wrapper
        res.status(200).json({
            children_passenger_ids: children,
            total_children: children.length
        });

    } catch (error) {
        console.error("Error fetching child passenger IDs:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error", 
            error: error.message 
        });
    }
}