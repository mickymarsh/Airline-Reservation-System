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

export const registeredbooking = (req, res) => {
    const query = "CALL add_registered_booking(?,?,?)";
    let values =[
        req.body.p_email,
        req.body.p_schedule_id,
        req.body.p_seat_no
    ]
    db.query(query, values, (err, data) => {
        if (err) {
            console.error("Database error:", err); // Log the error for debugging
            return res.status(500).json({ message: "An error occurred while registering the user." });
        }
        return res.status(200).json({ message: "Booking is successful!" });
    });
}

export const guestbooking = (req, res) => {
    const query = "CALL add_guest_booking(?,?,?,?,?,?,?)";
    let values =[
        req.body.p_full_name,
        req.body.p_gender,
        req.body.p_D_O_B,
        req.body.p_passport_number,
        req.body.p_mobile_num,
        req.body.p_schedule_id,
        req.body.p_seat_no
    ]
    db.query(query, values, (err, data) => {
        if (err) {
            console.error("Database error:", err); // Log the error for debugging
            return res.status(500).json({ message: "An error occurred while registering the user." });
        }
        return res.status(200).json({ message: "Booking is successful!" });
    });
}

export const getinfo = (req, res) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ message: "Email is required." });
    }

    db.query(
        `SELECT pd.full_name, pd.gender, pd.D_O_B, pd.passport_number, pd.mobile_num
FROM passenger_details pd
JOIN user u ON pd.passenger_id = u.passenger_id
WHERE u.email = ?`,
        [email],
        (err, results) => {
            if (err) {
                console.error("Error fetching user info:", err);
                return res.status(500).json({ message: "Server error." });
            }

            if (results.length === 0) {
                return res.status(404).json({ message: "User not found." });
            }

            res.json(results[0]); // Return user info
            console.log("fetching successfull")
        }
    );
};

export const bookings = (req, res) => {
    const { scheduleId, seatNo } = req.query;

    console.log("Incoming request:", { scheduleId, seatNo }); // Add this

    if (!scheduleId || !seatNo) {
        return res.status(400).json({ message: "Schedule ID and Seat No are required." });
    }

    db.query(
        `SELECT * FROM booking WHERE schedule_id = ? AND seat_no = ?`,
        [scheduleId, seatNo],
        (err, results) => {
            if (err) {
                console.error("Error fetching booking info:", err); // Check full error message
                return res.status(500).json({ message: "Server error." });
            }

            if (results.length === 0) {
                return res.status(200).json(null); // No booking
            }

            res.json(results[0]);
        }
    );
};
