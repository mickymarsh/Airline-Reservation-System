import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from "Bearer tokenString"
    
    if (!token) {
        return res.status(403).json({ message: "Access Denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token, "secretKey"); // Verify token
        req.user = decoded; // Attach decoded user data to request
        next(); // Proceed to next middleware
    } catch (error) {
        return res.status(401).json({ message: "Invalid Token" });
    }
};
