/**
 * Authentication Middleware
 * Protects private routes by verifying JWT tokens
 * If a valid token is present in the request header, it attaches user to `req.user`
 */

const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'jwt_secret';

// Middleware to protect routes
exports.protect = async (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token: Unauthorized" });    
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach user to request object
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token: Unauthorized" });
    }
}