import { Schema, model } from 'mongoose';

// Booking schema definition
const bookingSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'User', // References the User model
        required: true
    },
    hall: {
        type: Schema.Types.ObjectId,
        ref: 'Hall', // References the Hall model
        required: true
    },
    bookingId: {
        type: Number,
        unique: true,
        required: true
    },
    date: {
        type: String, // Store the date of booking (e.g., '2025-09-01')
        required: true
    },
    startTime: {
        type: String, // Store the start time (e.g., '10:00 AM')
        required: true
    },
    endTime: {
        type: String, // Store the end time (e.g., '2:00 PM')
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },
    totalPrice: {
        type: Number,
        required: true
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

// Add an index to quickly search by hall, date, and time range
bookingSchema.index({ hall: 1, date: 1, startTime: 1, endTime: 1 });

export default model("Booking", bookingSchema);
