import Hall from "../models/hallModel.mjs";


// Get all halls
export const getAllHalls = async () => {
    try {
        const halls = await Hall.find();
        return halls;
    } catch (err) {
        console.error("Error fetching halls:", err.message);
        throw new Error("Could not fetch halls.");
    }
};


export const addNewHall = async (newHall) => {
    const addHall = new Hall({
        hallName: newHall.hallName,
        capacity: newHall.capacity,
        amenities: newHall.amenities || [], // Default to an empty array if no amenities provided
        price: newHall.price,
    });

    try {
        const hall = await addHall.save();
        return hall || null;
    } catch (err) {
        console.error("Error saving hall:", err.message);
        throw new Error("Please input all the required data.");
    }
};