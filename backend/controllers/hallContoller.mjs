import { addNewHall, getAllHalls } from "../services/hallService.mjs";

export const addHallController = async (req, res) => {
    const { hallName, capacity, amenities, price } = req.body;

    // Check for required fields
    if (!hallName || !capacity || !price) {
        return res.status(400).json({ message: "Please provide hall name, capacity, and price!" });
    }

    const hallData = { hallName, capacity, amenities, price };

    try {
        const result = await addNewHall(hallData);
        if (!result || !result.hallName) {
            return res.status(400).json({ message: "Unable to add the hall!" });
        }

        return res.status(201).json({ success: true, result });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const getAllHallsController = async (req, res) => {
    try {
        const halls = await getAllHalls();
        return res.status(200).json({ success: true, halls });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
