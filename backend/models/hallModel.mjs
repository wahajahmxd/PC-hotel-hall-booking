import mongoose from 'mongoose';

const hallSchema = new mongoose.Schema({
    hallName: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    amenities: {
        type: [String], // Array of strings for amenities
        default: []
    },
    price: {
        type: Number,
        required: true
    }
});

export default mongoose.model("Hall", hallSchema);
 