import  db  from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getPasswordByEmail, insertUser } from "../models/user.model.js";

export const signInAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send("Missing required parameters");
        };
        const result =  await getPasswordByEmail(email);
        if ( !result) {
            return res.status(404).json("User Not Found");
        };
        const checkPassword = bcrypt.compare(password, result.password);
        if (!checkPassword) {
            return res.status(400).json("Wrong Password");
        };
        console.log("Login succesful");
        const token = jwt.sign({ email }, "secretKey",{expiresIn:"1h"});

        res.cookie("accessToken", token, {
            httpOnly: true
        }).status(200).json({ email, token });
    } catch (error) {
        console.error("login error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const signUpAdmin = async (req, res) => {
    const secretKey = process.env.JWT_SECRET;
    const userData = req.body;
    try {
        const { first_name, last_name, email, password } = userData;
        if (!first_name || !last_name || !email || !password) {
            return res.status(400).send("Missing required parameters");
        }

        // Check if user already exists
        const result = await getPasswordByEmail(email);
        if (result !== null) {
            console.log("User already exists:", result);
            return res.status(400).json("User already exists");
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const role = 'admin'; // Default role
        const values = [first_name, last_name, email, hashedPassword, role];

        // Insert new user into the database
        try {
            const addUser = await insertUser(...values);
            const token = jwt.sign({ email }, secretKey, { expiresIn: "1h" });
            // Send success response with token in an object
            return res.status(200).json({
                message: "User created successfully",
                token: token // Sending the token as part of the response object
            });
        } catch (err) {
            console.error("Error inserting user:", err);
            return res.status(500).json({ error: "Failed to create user", message: err.message });
        }

    } catch (error) {
        console.error("signup error:", error);
        res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
};

export const signOutAdmin = async (req, res) => {
    res.clearCookie("accessToken").send("Logged out");
};


export const getUserName = async (req, res) => {
    try {
        const email = req.user.email; // Extract email from decoded token

        const [rows] = await db.query("SELECT first_name FROM user WHERE email = ?", [email]);
        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ first_name: rows[0].first_name });
    } catch (error) {
        console.error("Error fetching user name:", error);
        res.status(500).json({ message: "Server error", error });
    }
};

// const { verifyToken } = require("../middleware/authMiddleware");

// // Fetch admin's first name using email
// router.get("/me", verifyToken, async (req, res) => {
//   try {
//     const email = req.user.email; // Extracted from token
//     const [rows] = await pool.query("SELECT first_name FROM admins WHERE email = ?", [email]);

//     if (rows.length === 0) {
//       return res.status(404).json({ message: "Admin not found" });
//     }

//     res.json({ firstName: rows[0].first_name });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// });

// module.exports = router;






