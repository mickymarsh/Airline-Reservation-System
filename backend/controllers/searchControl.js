import { db } from "../connect.js";

export const search = (req, res) => {
    const searchTerm = req.query.q;
    const field = req.query.field; // 'source_code' or 'destination_code'

    if (!searchTerm || !field) {
        return res.status(400).json({ error: "Missing search term or field" });
    }

    // Validate field to prevent SQL injection
    const allowedFields = ["source_code", "destination_code"];
    
    const cleanedField = field.trim();

    

    if (!allowedFields.includes(field)) {
        return res.status(400).json({ error: "Invalid search field" });
    }

    // Use parameterized query to prevent SQL injection
    const query = `SELECT DISTINCT ?? FROM route WHERE ${field} LIKE ? LIMIT 10`;
    db.query(query, [field, `%${searchTerm}%`], (err, results) => {

        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(results);
    });
};

