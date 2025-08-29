import mongoose from 'mongoose';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// User schema definition
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your Name."],
        maxLength: [30, "Name can't exceed 30 characters."],
        minLength: [5, "Name should contain at least 5 characters."]
    },
    email: {
        type: String,
        required: [true, "Enter your email."],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email."]
    },
    password: {
        type: String,
        required: [true, "Please enter your Password."],
        minLength: [8, "Password should contain at least 8 characters."],
        select: false           // Prevent password from being included in query results
    },
    role: {
    type: String,
    enum: ["user", "admin"], 
    default: "user",         
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire: {
        type: Date
    }
});

// Method to generate JWT token
userSchema.methods.getJWTToken = function () {
    const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        algorithm: "HS256",
        expiresIn: process.env.JWT_EXP,
    });
    return token;
};

// Method to generate password reset token
userSchema.methods.getPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hashing the reset token before saving
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // Token expires in 15 minutes
    return this;
};

// Hash password before saving to DB
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    
    // Hash password with bcrypt
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Compare entered password with stored hashed password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};


export default mongoose.model("User", userSchema);
