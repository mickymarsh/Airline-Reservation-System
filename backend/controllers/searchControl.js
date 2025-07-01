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


export const getFlightId = (req, res) => {
  const { source, destination, startDate, endDate } = req.query;

  console.log("Received GET params:", source, destination, startDate, endDate);
  

  const query = `SELECT s.schedule_id, s.aircraft_id
FROM schedule s
JOIN route r ON s.route_id = r.route_id
WHERE r.source_code = ?
  AND r.destination_code = ?
  AND DATE(s.departure_time) BETWEEN ? AND ?
  AND DATE(s.arrival_time) BETWEEN ? AND ?;
`;

  // Pass startDate and endDate twice to match the 6 placeholders
  db.query(query, [source, destination, startDate, endDate, startDate, endDate], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error" });
    }
    if (results.length == 0) return res.json({ scheduleId: null, flightId: null});

    // Access the correct field name
    res.json({ scheduleId: results[0].schedule_id, flightId: results[0].aircraft_id });
    
  });
};




