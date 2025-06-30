import { db } from "../connect.js";

export const reserve = (req, res) => {
    const query = "CALL add_reservation(?,?)";
    let values =[
        req.body.p_Schedule_id,
        req.body.p_Seat_No
    ]
    db.query(query, values, (err, data) => {
        if (err) {
            console.error("Database error:", err); // Log the error for debugging
            return res.status(500).json({ message: "An error occurred while registering the user." });
        }
        return res.status(200).json({ message: "Seates are reserved!" });
    });
}