import jwt from 'jsonwebtoken';
import User from '../models/userModel.mjs';  // Adjust the path as necessary

// Middleware to check if user is authenticated
export const isAuthenticUser = async (req, res, next) => {
    const { token } = req.cookies; // Extract token from cookies
    if (!token) {
        return res.status(401).json({ 'message': "Please login to continue!" });
    }

    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);  // Verify token using JWT secret
        const user = await User.findById(decodedData.id); // Find the user based on the ID in the token
        if (!user) {
            return res.status(401).json({ 'message': "User not found!" });
        }
        req.user = user;  // Attach user to request object
        next();
    } catch (error) {
        return res.status(401).json({ 'message': "Invalid or expired token!" });
    }
};

// Middleware to check user role
export const authorizeRoles = (...roles) => {  // Role checking function
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 'message': `This resource is not allowed to access with '${req.user.role}' role!` });
        }
        next();
    };
};
