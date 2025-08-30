import { createBooking } from "../services/bookingService.mjs";

export const bookHallController = async (req, res) => {
    const { userId, hallId, bookingData } = req.body;

    try {
        const booking = await createBooking(userId, hallId, bookingData);

        return res.status(201).json({ success: true, booking });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
