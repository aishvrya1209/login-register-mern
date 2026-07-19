// Import jsonwebtoken package to verify JWT tokens
const jwt = require("jsonwebtoken");

// Import User model to fetch user details from MongoDB
const User = require("../models/user");

// Middleware to protect private routes
const protect = async (req, res, next) => {
    try {

        // Variable to store the extracted token
        let token;

        // Check if Authorization header exists
        // and starts with "Bearer"
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {

            // Header looks like:
            // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

            // Split the header by space:
            // ["Bearer", "eyJhbGc..."]
            // Take the second part (actual JWT)
            token = req.headers.authorization.split(" ")[1];

            // Verify token using our secret key
            // If valid, decoded will contain the payload
            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            // Fetch user from database using ID stored in token
            // Exclude password using .select("-password")
            req.user = await User.findById(decoded.id).select("-password");
            
            // If user is not found, return 401 Unauthorized
            if (!req.user) {
                return res.status(401).json({
                    message: "User not found."
                });
            }
            // Move to the next middleware/controller
            next();

        } else {

            // No token was provided
            return res.status(401).json({
                message: "Not authorized. No token provided."
            });

        }

    } catch (error) {

        console.error(error);

        return res.status(401).json({
            message: "Not authorized. Invalid token."
        });

    }
};

// Export middleware
module.exports = protect;