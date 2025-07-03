import { db } from "../connect.js";

export const register = async (req, res) => {
  try {
    // Check if user already exists
    const checkUserQuery = "SELECT * FROM user WHERE email = ?";
    const [existingUsers] = await db.query(checkUserQuery, [req.body.email]);

    if (existingUsers.length) {
      return res.status(409).json({ message: "User already exists!" });
    }

    // Insert new user using stored procedure
    const insertUserQuery = "CALL register_user(?,?,?,?,?,?,?,?,?)";
    const values = [
      req.body.full_name,
      req.body.gender,
      req.body.dob,
      req.body.passport_number,
      req.body.mobile_num,
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.password,
    ];

    await db.query(insertUserQuery, values);

    return res.status(200).json({ message: "User has been created!" });

  } catch (err) {
    console.error("Database error:", err);
    return res.status(500).json({ message: "An error occurred while registering the user." });
  }
};
