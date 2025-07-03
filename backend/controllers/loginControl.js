import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const q = "SELECT * FROM user WHERE email = ?";

  try {
    const [data] = await db.query(q, [req.body.email]);

    if (data.length === 0) return res.status(404).json("User not found!");

    if (req.body.password !== data[0].password) {
      return res.status(400).json("Wrong password or username!");
    }

    const token = jwt.sign({ email: data[0].email }, "secretkey");

    const { password, ...others } = data[0];

    // Set the JWT token as a cookie
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });

    res.status(200).json({ user: others });
  } catch (err) {
    res.status(500).json(err);
  }
};

export const logout = (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
  }).status(200).json("User has been logged out.");
};
