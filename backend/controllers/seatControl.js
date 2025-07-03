import { db } from "../connect.js";

export const getseatlist = async (req, res) => {
  try {
    const scheduleId = req.query.schedule_id;
    if (!scheduleId) {
      return res.status(400).json({ error: "schedule_id is required" });
    }

    const query = "SELECT * FROM seat WHERE schedule_id = ?";
    const [results] = await db.query(query, [scheduleId]);

    return res.json(results);
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({ error: "DB error" });
  }
};
