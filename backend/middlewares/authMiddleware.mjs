import jwt from 'jsonwebtoken';
import User from '../models/userModel.mjs';  

// Middleware to check if user is authenticated
export const isAuthenticUser = async (req, res, next) => {
    const { token } = req.cookies; 
    if (!token) {
        return res.status(401).json({ 'message': "Please login to continue!" });
    }

    try {
        const decodedData = jwt.verify(token, process.env.JWT_SECRET); 
        const user = await User.findById(decodedData.id); 
        if (!user) {
            return res.status(401).json({ 'message': "User not found!" });
        }
        req.user = user;  
        next();
    } catch (error) {
        return res.status(401).json({ 'message': "Invalid or expired token!" });
    }
};

