import db from "../connect.js";
import { getFlightEconomyClassCount, getFlightBusinessClassCount, getFlightPlatinumClassCount, getPassengerChildIDs, insertFlight,getNextFlightNumber} from "../models/schedule.model.js";

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

        // Send response with the class details
        res.status(200).json({
            success: true,
            flight_number: flight_number,
            class_details: {
                economy_class_count: economy_class_seats,
                business_class_count: business_class_seats,
                platinum_class_count: platinum_class_seats
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

export const addFlightFunction = async (req, res) => {
    try {
        const { route_id, aircraft_id, departure_time, arrival_time, status, economy_price, business_price, platinum_price, flight_number } = req.body;

        if (!route_id || !aircraft_id || !departure_time || !arrival_time || !status || !economy_price || !business_price || !platinum_price || !flight_number) {
            return res.status(400).json({
                success: false,
                message: "Missing required parameters"
            });
        }

        // Insert new flight into the database
        const result = await insertFlight(route_id, aircraft_id, departure_time, arrival_time, status, economy_price, business_price, platinum_price, flight_number);

        return res.status(200).json({
            success: true,
            message: "Flight added successfully",
            
        });

    } catch (error) {
        console.error("Error adding flight:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error.message
        });
    }
};

export const getFlightCount = async (req, res) => {
    try {
        const count = await getNextFlightNumber();
        
        // Return the data in the format expected by frontend
        res.status(200).json({
            success: true,
            count: count,
            flight_count: count
        });

    } catch (error) {
        console.error("Error fetching flight count:", error);
        res.status(500).json({ 
            success: false, 
            message: "Server error", 
            error: error.message 
        });
    }
}