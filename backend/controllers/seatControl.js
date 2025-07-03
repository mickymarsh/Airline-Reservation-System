import { db } from "../connect.js";

export const getseatlist = (req, res) => {
    const scheduleId = req.query.schedule_id;
    const query = 'SELECT * FROM seat WHERE schedule_id = ?';

    db.query(query, [scheduleId], (err, results) => {
        if (err) return res.status(500).json({ error: 'DB error' });
        res.json(results);
    });
}