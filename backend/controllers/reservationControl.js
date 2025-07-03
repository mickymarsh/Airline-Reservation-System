import { db } from "../connect.js";

export const reserve = async (req, res) => {
  try {
    const query = "CALL add_reservation(?, ?)";
    const values = [req.body.p_Schedule_id, req.body.p_Seat_No];

    await db.query(query, values);
    return res.status(200).json({ message: "Seats are reserved!" });
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({ message: "An error occurred while registering the user." });
  }
};

export const registeredbooking = async (req, res) => {
  try {
    const query = "CALL add_registered_booking(?, ?, ?)";
    const values = [req.body.p_email, req.body.p_schedule_id, req.body.p_seat_no];

    await db.query(query, values);
    return res.status(200).json({ message: "Booking is successful!" });
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({ message: "An error occurred while registering the user." });
  }
};

export const guestbooking = async (req, res) => {
  try {
    const query = "CALL add_guest_booking(?, ?, ?, ?, ?, ?, ?)";
    const values = [
      req.body.p_full_name,
      req.body.p_gender,
      req.body.p_D_O_B,
      req.body.p_passport_number,
      req.body.p_mobile_num,
      req.body.p_schedule_id,
      req.body.p_seat_no,
    ];

    await db.query(query, values);
    return res.status(200).json({ message: "Booking is successful!" });
  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({ message: "An error occurred while registering the user." });
  }
};

export const getinfo = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const query = `
      SELECT pd.full_name, pd.gender, pd.D_O_B, pd.passport_number, pd.mobile_num
      FROM passenger_details pd
      JOIN user u ON pd.passenger_id = u.passenger_id
      WHERE u.email = ?
    `;

    const [results] = await db.query(query, [email]);

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    console.log("fetching successful");
    return res.json(results[0]);
  } catch (err) {
    console.error("Error fetching user info:", err);
    return res.status(500).json({ message: "Server error." });
  }
};

export const bookings = async (req, res) => {
  try {
    const { scheduleId, seatNo } = req.query;

    console.log("Incoming request:", { scheduleId, seatNo });

    if (!scheduleId || !seatNo) {
      return res.status(400).json({ message: "Schedule ID and Seat No are required." });
    }

    const query = `SELECT * FROM booking WHERE schedule_id = ? AND seat_no = ?`;

    const [results] = await db.query(query, [scheduleId, seatNo]);

    if (results.length === 0) {
      return res.status(200).json(null);
    }

    return res.json(results[0]);
  } catch (err) {
    console.error("Error fetching booking info:", err);
    return res.status(500).json({ message: "Server error." });
  }
};

export const history = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const query = `
      SELECT b.*
      FROM booking b
      JOIN user u ON b.passenger_id = u.passenger_id
      WHERE u.email = ?
    `;

    const [results] = await db.query(query, [email]);

    if (results.length === 0) {
      return res.status(404).json({ message: "Bookings not found." });
    }

    console.log("fetching booking history successful");
    console.log(results);
    return res.json(results);
  } catch (err) {
    console.error("Error fetching user info:", err);
    return res.status(500).json({ message: "Server error." });
  }
};
