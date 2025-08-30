import { Schema, model } from 'mongoose';


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
        type: String, 
        required: true
    },
    startTime: {
        type: String, 
        required: true
    },
    endTime: {
        type: String, 
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
}, { timestamps: true }); 


bookingSchema.index({ hall: 1, date: 1, startTime: 1, endTime: 1 });

export default model("Booking", bookingSchema);
