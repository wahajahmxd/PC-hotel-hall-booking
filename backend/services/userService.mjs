import bcrypt from 'bcryptjs';
import User from '../models/userModel.mjs'; // Adjust the path as necessary

// Add a new user to the database
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

// Delete a user by ID
export const deleteUser = async (id) => {
    try {
        const deletedObj = await User.findOneAndDelete({ _id: id });
        return deletedObj;
    } catch (err) {
        throw new Error("User not found!");
    }
};

// Update a user's role
export const updateRole = async (id, role) => {
    try {
        const updatedObj = await User.findByIdAndUpdate(id, { role }, { new: true });
        return updatedObj;
    } catch (err) {
        throw new Error("Error updating role.");
    }
};

// Update user password
export const updateUserPass = async (id, oldPass, newPass) => {
    const user = await User.findById(id).select("+password");
    if (!user) {
        throw new Error("User not found!");
    }

    const isVerified = await bcrypt.compare(oldPass, user.password);
    if (!isVerified) {
        throw new Error("Old password is incorrect!");
    }

    user.password = await bcrypt.hash(newPass, 12);
    await user.save();
    return user;
};

// Change password using a reset token
export const changePassword = async (validToken, newPass) => {
    const user = await User.findOne({ resetPasswordToken: validToken });

    if (!user || user.resetPasswordExpire < Date.now()) {
        throw new Error("Invalid or expired reset token.");
    }

    user.password = await bcrypt.hash(newPass, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    return user;
};

// Update user details (name and email)
export const updateUserDetail = async (id, updatedName, updatedEmail) => {
    try {
        const updates = { name: updatedName, email: updatedEmail };
        const updatedObj = await User.findByIdAndUpdate(id, updates, { runValidators: true, new: true });
        return updatedObj;
    } catch (err) {
        throw new Error("Error updating user details.");
    }
};

// Update user using token-based updates (for example, after login)
export const updateUserWithToken = async (objTemp) => {
    const updatedObj = await User.findByIdAndUpdate(objTemp._id, objTemp, { new: true }).select("+password");
    return updatedObj;
};

// Find user by ID
export const findUserById = async (id) => {
    try {
        const user = await User.findById(id);
        return user;
    } catch (err) {
        throw new Error("User not found.");
    }
};

// Get all users
export const getAllUser = async () => {
    try {
        const users = await User.find();
        return users;
    } catch (err) {
        throw new Error("No users found!");
    }
};

// Validate user credentials for login
export const validateCredentials = async (email, password) => {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        throw new Error("Invalid credentials.");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
        return user;
    }

    throw new Error("Invalid credentials.");
};

// Find user by email
export const findUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    return user || null;
};
