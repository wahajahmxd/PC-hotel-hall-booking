import Booking from '../models/bookingModel.mjs';
import Hall from '../models/hallModel.mjs';

// Check if the hall is available for a specific date and time slot
export const checkHallAvailability = async (hallId, date, startTime, endTime) => {
    try {
        // Find existing bookings that overlap with the given date and time slot
        const existingBookings = await Booking.find({
            hall: hallId,
            date: date,
            $or: [
                { 
                    $and: [
                        { startTime: { $lt: endTime } },  // The start time is before the end time
                        { endTime: { $gt: startTime } }   // The end time is after the start time
                    ]
                }
            ]
        });

        // If there are any bookings that overlap, the hall is not available
        if (existingBookings.length > 0) {
            return { available: false, message: "The hall is already booked for the selected time." };
        }

        return { available: true };
    } catch (error) {
        console.error("Error checking availability:", error.message);
        throw new Error("Error checking hall availability.");
    }
};

// Create a booking for a user
export const createBooking = async (userId, hallId, bookingData) => {
    const { date, startTime, endTime, totalPrice } = bookingData;

    // First, check if the hall is available for the selected date and time
    const availability = await checkHallAvailability(hallId, date, startTime, endTime);

    if (!availability.available) {
        throw new Error(availability.message); // If not available, return error
    }

    try {
        // Create a new booking object
        const booking = new Booking({
            customer: userId,       // User ID from the request
            hall: hallId,           // Hall ID from the request
            bookingId: Date.now(),  // You can use a timestamp or other logic to generate unique IDs
            date: date,
            startTime: startTime,
            endTime: endTime,
            status: 'pending',      // Default status is pending
            totalPrice: totalPrice
        });

        // Save the booking to the database
        await booking.save();

        return booking;
    } catch (error) {
        console.error('Error creating booking:', error.message);
        throw new Error('Booking creation failed');
    }
};
