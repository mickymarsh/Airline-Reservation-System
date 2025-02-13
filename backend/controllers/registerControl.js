import { db } from "../connect.js";

export const register = (req, res) => {
    // Check if the user already exists in the database
    const checkUserQuery = "SELECT * FROM user WHERE email = ?";
    db.query(checkUserQuery, [req.body.email], (err, data) => {
        if (err) {
            console.error("Database error:", err); // Log the error for debugging
            return res.status(500).json({ message: "An error occurred while checking the user." });
        }

        if (data.length) {
            // If user already exists, return a conflict status with a message
            return res.status(409).json({ message: "User already exists!" });
        }

        // If user doesn't exist, insert the new user into the database
        const insertUserQuery = "CALL register_user(?,?,?,?,?,?,?,?,?)";
        let values = [
            req.body.full_name,
            req.body.gender,
            req.body.dob,
            req.body.passport_number,
            req.body.mobile_num,
            req.body.first_name,
            req.body.last_name,
            req.body.email,
            req.body.password
        ];

        db.query(insertUserQuery, values, (err, data) => {
            if (err) {
                console.error("Database error:", err); // Log the error for debugging
                return res.status(500).json({ message: "An error occurred while registering the user." });
            }
            return res.status(200).json({ message: "User has been created!" });
        });
    });
};