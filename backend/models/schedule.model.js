import { db } from "../connect.js";

// Get passenger count by class for a given route and date range
export const getFlightEconomyClassCount = async (flight_number) => {
    const query = `
        SELECT COUNT(passenger_id) as count
        FROM booking 
        LEFT JOIN schedule ON booking.schedule_id = schedule.schedule_id
        WHERE booking.seat_no LIKE 'E%' and schedule.flight_number = ?;
        `;

    try {
        const [rows] = await db.query(query, [flight_number]);
        return rows[0].count; // Return just the count value
    } catch (err) {
        console.log("Database error:", err);
        throw err;
    }
};

export const getFlightBusinessClassCount = async (flight_number) => {
    const query = `
        SELECT COUNT(passenger_id) as count
        FROM booking 
        LEFT JOIN schedule ON booking.schedule_id = schedule.schedule_id
        WHERE booking.seat_no LIKE 'B%' and schedule.flight_number = ?;
        `;

    try {
        const [rows] = await db.query(query, [flight_number]);
        return rows[0].count; // Return just the count value
    } catch (err) {
        console.log("Database error:", err);
        throw err;
    }
};

export const getFlightPlatinumClassCount = async (flight_number) => {
    const query = `
        SELECT COUNT(passenger_id) as count
        FROM booking 
        LEFT JOIN schedule ON booking.schedule_id = schedule.schedule_id
        WHERE booking.seat_no LIKE 'P%' and schedule.flight_number = ?;
        `;

    try {
        const [rows] = await db.query(query, [flight_number]);
        return rows[0].count; // Return just the count value
    } catch (err) {
        console.log("Database error:", err);
        throw err;
    }
};

export const getPassengerChildIDs = async (flight_number) => {
    const query = `
        SELECT passenger_details.passenger_id
        FROM booking 
        LEFT JOIN passenger_details ON passenger_details.passenger_id = booking.passenger_id
        LEFT JOIN schedule ON schedule.schedule_id = booking.schedule_id
        WHERE schedule.flight_number = ? AND get_passenger_age(passenger_details.passenger_id) < 18;
        `;

    try {
        const [rows] = await db.query(query, [flight_number]);
        // Return array of passenger IDs, not count
        return rows.map(row => row.passenger_id);
    } catch (err) {
        console.log("Database error:", err);
        throw err;
    }
};