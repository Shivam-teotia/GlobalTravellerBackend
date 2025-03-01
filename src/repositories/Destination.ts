import Destination from "../models/Destination";

export const getRandomDestinationFromDB = async () => {
    const count = await Destination.countDocuments();
    const random = Math.floor(Math.random() * count);
    return await Destination.findOne().skip(random);
};

export const findDestinationByCityOrCountry = async (
    city: string,
    country: string
) => {
    return await Destination.findOne({
        $or: [
            { city: { $regex: new RegExp("^" + city + "$", "i") } },
            { country: { $regex: new RegExp("^" + country + "$", "i") } },
        ],
    });
};
export const addNewDestination = async (
    city: string,
    country: string,
    clues: string[],
    funFacts: string[],
    trivia: string[]
) => {
    const newDestination = new Destination({
        city,
        country,
        clues,
        funFacts,
        trivia,
    });
    return newDestination.save();
};
