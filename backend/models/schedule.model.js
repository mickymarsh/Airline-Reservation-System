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