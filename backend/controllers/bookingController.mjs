import { createBooking } from "../services/bookingService.mjs";

export const bookHallController = async (req, res) => {
    const { userId, hallId, bookingData } = req.body;

    try {
        // Call the service to create the booking
        const booking = await createBooking(userId, hallId, bookingData);

        // Respond with the created booking
        return res.status(201).json({ success: true, booking });
    } catch (error) {
        // Handle errors (e.g., hall already booked, validation issues)
        return res.status(400).json({ message: error.message });
    }
};
