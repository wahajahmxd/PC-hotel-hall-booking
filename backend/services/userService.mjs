import bcrypt from 'bcryptjs';
import User from '../models/userModel.mjs'; 

export const addNewUser = async (newUser) => {
    const addUser = new User({
        name: newUser.name,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role || 'user', // Default to 'user' role if not provided
    });

    try {
        const user = await addUser.save();
        return user || null;
    } catch (err) {
        console.error("Error saving user:", err.message);
        throw new Error("Please input all the required data.");
    }
};

// Update user using token-based updates (for example, after login)
export const updateUserWithToken = async (objTemp) => {
    const updatedObj = await User.findByIdAndUpdate(objTemp._id, objTemp, { new: true }).select("+password");
    return updatedObj;
};

// Validate user credentials for login
export const validateCredentials = async (email, password) => {
    console.log('[validateCredentials] Email received:', email);
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        console.error('[validateCredentials] No user found with email:', email);
        throw new Error("User not found.");
    }

    console.log('[validateCredentials] User found. Hashed password in DB:', user.password);
    const isValid = await bcrypt.compare(password, user.password);
    console.log('[validateCredentials] Password comparison result:', isValid);
    if (isValid) {
        return user;
    }

    console.error('[validateCredentials] Password mismatch for user:', email);
    throw new Error("Incorrect password.");
};

// Find user by email
export const findUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    return user || null;
};
