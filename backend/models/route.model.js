import { db } from "../connect.js";

export const getRouteBySandD = async (source_code, destination_code) => {
    const query = "SELECT route_id FROM route WHERE source_code = ? AND destination_code = ?";
    try {
        const [rows] = await db.query(query, [source_code, destination_code]);
        if (rows.length === 0) {
            console.log(rows);
            return null;
        }
        return rows[0];
    } catch (err) {
        console.log("Database error:", err);
        throw err;
    }
};

export const insertRoute = async (source_code, destination_code, duration) => {
    const query = "INSERT INTO route (source_code,destination_code,duration) VALUES (?, ?, ?)";

    const values = [
        source_code,
        destination_code,
        duration
    ];

    try {
        const result = await db.execute(query, values);
        return result;
    } catch (err) {
        console.log("Database error during insert:", err);
        throw err; // Rethrow the error to be handled by the caller
    }
};






