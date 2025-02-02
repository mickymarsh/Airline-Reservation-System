import { db } from "../config.js";

export const getPasswordByEmail = async (email) => {
    const query = "SELECT password FROM user WHERE email = ?";
    try {
        const [rows] = await db.query(query, [email]);
        if (rows.length === 0) {
            return null;
        }
        return rows[0];
    } catch (err) {
        console.log("Database error:", err);
        throw err;
    }
};

// export const insertUser = async (first_name, last_name, email, password) => {
//     const query = "INSERT INTO user (first_name, last_name, email, password,role) VALUES (?, ?, ?, ?,'passenger')";
    
//     const values = [
//         first_name,
//         last_name,
//         email,
//         password
//     ];
//     const result = await db.execute(query, values);
//     return result;
// }
export const insertUser = async (first_name, last_name, email, password, role) => {
    const query = "INSERT INTO user (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)";

    const values = [
        first_name,
        last_name,
        email,
        password,
        role
    ];

    try {
        const result = await db.execute(query, values);
        return result;
    } catch (err) {
        console.log("Database error during insert:", err);
        throw err; // Rethrow the error to be handled by the caller
    }
};






