import { db } from "../connect.js";

export const getAircraftByModelBrand = async (brand,model) => {
    const query = "SELECT * FROM aircraft WHERE model = ? AND brand = ?";
    try {
        const [rows] = await db.query(query, [model,brand]);
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

export const insertAircraft = async (brand,model,last_service_date,purchase_date,manufactured_date) => {
    const query = "CALL add_aircraft(?, ?, ?,?,?)";

    const values = [
        brand,
        model,
        last_service_date,  
        purchase_date,
        manufactured_date
    ];

    try {
        const result = await db.execute(query, values);
        return result;
    } catch (err) {
        console.log("Database error during insert:", err);
        throw err; // Rethrow the error to be handled by the caller
    }
};


export const updateServiceDate = async (last_service_date,brand,model) => {
    const query = "UPDATE aircraft SET last_service_date = ? WHERE brand = ? AND model = ?";

    const values = [
        last_service_date,  
        brand,
        model
    ];

    try {
        const result = await db.execute(query, values);
        return result;
    } catch (err) {
        console.log("Database error during update:", err);
        throw err; // Rethrow the error to be handled by the caller
    }
};





