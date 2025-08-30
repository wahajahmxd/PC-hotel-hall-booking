import Booking from '../models/bookingModel.mjs';
import Hall from '../models/hallModel.mjs';

export const checkHallAvailability = async (hallId, date, startTime, endTime) => {
    try {
        const existingBookings = await Booking.find({
            hall: hallId,
            date: date,
            $or: [
                { 
                    $and: [
                        { startTime: { $lt: endTime } },  
                        { endTime: { $gt: startTime } }   
                    ]
                }
            ]
        });

        if (existingBookings.length > 0) {
            return { available: false, message: "The hall is already booked for the selected time." };
        }

        return { available: true };
    } catch (error) {
        console.error("Error checking availability:", error.message);
        throw new Error("Error checking hall availability.");
    }
};

export const createBooking = async (userId, hallId, bookingData) => {
    const { date, startTime, endTime, totalPrice } = bookingData;

    const availability = await checkHallAvailability(hallId, date, startTime, endTime);

    if (!availability.available) {
        throw new Error(availability.message); 
    }

    try {
        const booking = new Booking({
            customer: userId,       
            hall: hallId,           
            bookingId: Date.now(),  
            date: date,
            startTime: startTime,
            endTime: endTime,
            status: 'pending',      
            totalPrice: totalPrice
        });

        await booking.save();

        return booking;
    } catch (error) {
        console.error('Error creating booking:', error.message);
        throw new Error('Booking creation failed');
    }
};
