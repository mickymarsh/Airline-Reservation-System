import { db } from "../connect.js";

export const search = async (req, res) => {
  const searchTerm = req.query.q;
  const field = req.query.field; // 'source_code' or 'destination_code'

  if (!searchTerm || !field) {
    return res.status(400).json({ error: "Missing search term or field" });
  }

  const allowedFields = ["source_code", "destination_code"];
  if (!allowedFields.includes(field.trim())) {
    return res.status(400).json({ error: "Invalid search field" });
  }

  const query = `SELECT DISTINCT ?? FROM route WHERE ${field} LIKE ? LIMIT 10`;

  try {
    const [results] = await db.query(query, [field, `%${searchTerm}%`]);
    res.json(results);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database error" });
  }
};


export const getFlightId = async (req, res) => {
  const { source, destination, startDate, endDate } = req.query;

  console.log("Received GET params:", source, destination, startDate, endDate);

  const query = `
    SELECT s.schedule_id, s.aircraft_id
    FROM schedule s
    JOIN route r ON s.route_id = r.route_id
    WHERE r.source_code = ?
      AND r.destination_code = ?
      AND DATE(s.departure_time) BETWEEN ? AND ?
      AND DATE(s.arrival_time) BETWEEN ? AND ?;
  `;

  try {
    const [results] = await db.query(query, [source, destination, startDate, endDate, startDate, endDate]);
    
    if (results.length === 0) {
      return res.json({ scheduleId: null, flightId: null });
    }

    res.json({ scheduleId: results[0].schedule_id, flightId: results[0].aircraft_id });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Database error" });
  }
};
